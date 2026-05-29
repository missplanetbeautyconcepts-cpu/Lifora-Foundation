import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Regular JSON parsing
  app.use(express.json());

  // Deep parse function for Google Form JS variable FB_PUBLIC_LOAD_DATA_
  function parseJsArray(str: string): any {
    let i = 0;
    
    function skipWhitespace() {
      while (i < str.length && /\s/.test(str[i])) {
        i++;
      }
    }
    
    function parseValue(): any {
      skipWhitespace();
      if (i >= str.length) return null;
      
      if (str[i] === '[') {
        i++; // skip '['
        const arr: any[] = [];
        while (true) {
          skipWhitespace();
          if (str[i] === ']') {
            i++; // skip ']'
            return arr;
          }
          arr.push(parseValue());
          skipWhitespace();
          if (str[i] === ',') {
            i++; // skip ','
          } else if (str[i] !== ']') {
            break;
          }
        }
        return arr;
      }
      
      if (str[i] === '"' || str[i] === "'") {
        const quote = str[i];
        i++; // skip quote
        let val = "";
        while (i < str.length && str[i] !== quote) {
          if (str[i] === '\\') {
            i++;
            if (i < str.length) {
              if (str[i] === 'u') {
                const hex = str.substring(i + 1, i + 5);
                val += String.fromCharCode(parseInt(hex, 16));
                i += 4;
              } else if (str[i] === 'n') {
                val += '\n';
              } else if (str[i] === 't') {
                val += '\t';
              } else if (str[i] === 'r') {
                val += '\r';
              } else {
                val += str[i];
              }
            }
          } else {
            val += str[i];
          }
          i++;
        }
        i++; // skip closing quote
        return val;
      }
      
      let token = "";
      while (i < str.length && !/[\[\], \s"']/.test(str[i])) {
        token += str[i];
        i++;
      }
      
      if (token === "null" || token === "") return null;
      if (token === "undefined") return undefined;
      if (token === "true") return true;
      if (token === "false") return false;
      
      const num = Number(token);
      if (!isNaN(num)) return num;
      return token;
    }
    
    return parseValue();
  }

  function findEntryIds(arr: any): number[] {
    const ids: number[] = [];
    function recurse(val: any) {
      if (Array.isArray(val)) {
        if (
          val.length >= 3 &&
          typeof val[0] === 'number' &&
          val[0] > 100000 &&
          val[1] === null &&
          (val[2] === 0 || val[2] === 1 || typeof val[2] === 'number')
        ) {
          ids.push(val[0]);
        }
        for (const item of val) {
          recurse(item);
        }
      }
    }
    recurse(arr);
    return ids;
  }

  function findBestKey(title: string, answers: Record<string, any>): string | null {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedTitle = norm(title);
    
    for (const key of Object.keys(answers)) {
      if (norm(key) === normalizedTitle || normalizedTitle.includes(norm(key)) || norm(key).includes(normalizedTitle)) {
        return key;
      }
    }
    return null;
  }

  // Submit to Google Form endpoint
  app.post('/api/submit-to-google-form', async (req: express.Request, res: express.Response) => {
    try {
      const { formUrl, answers } = req.body;
      if (!formUrl || !answers) {
        res.json({ success: false, error: 'Missing formUrl or answers' });
        return;
      }

      const formIdMatch = formUrl.match(/\/forms\/d\/(e\/)?([a-zA-Z0-9_-]+)/);
      if (!formIdMatch) {
        res.json({ success: false, error: 'Invalid Google Form URL' });
        return;
      }
      const formId = formIdMatch[2];

      const formPageRes = await fetch(formUrl);
      if (!formPageRes.ok) {
        res.json({ success: false, error: `Failed to fetch Google Form page (HTTP ${formPageRes.status})` });
        return;
      }
      const html = await formPageRes.text();

      const match = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(.*?);/s);
      if (!match) {
        res.json({ success: false, error: 'Could not parse Google Form configuration. Please ensure it is a public form link.' });
        return;
      }

      const parsedData = parseJsArray(match[1].trim());
      if (!parsedData || !parsedData[1] || !parsedData[1][1]) {
        res.json({ success: false, error: 'Malformed Google Form page structure' });
        return;
      }

      const formItems = parsedData[1][1];
      const bodyData = new URLSearchParams();

      for (const item of formItems) {
        const title = item[1];
        if (title && typeof title === 'string') {
          const entryIds = findEntryIds(item);
          if (entryIds.length > 0) {
            const bestKey = findBestKey(title, answers);
            if (bestKey !== null) {
              const val = answers[bestKey];
              if (Array.isArray(val)) {
                for (const singleVal of val) {
                  bodyData.append(`entry.${entryIds[0]}`, String(singleVal));
                }
              } else {
                bodyData.append(`entry.${entryIds[0]}`, String(val));
              }
            }
          }
        }
      }

      const submitUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
      const submitRes = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyData.toString(),
      });

      if (!submitRes.ok && submitRes.status >= 400) {
        res.json({ success: false, error: `Google Forms submission failed (HTTP ${submitRes.status})` });
        return;
      }

      res.json({ success: true });
    } catch (err: any) {
      console.error('Submission error:', err);
      res.json({ success: false, error: err.message || 'Internal Server Error' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Frontend server is running' });
  });

  // Serve Frontend
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
    console.log('Backend logic has been moved to FastAPI: https://lifofoundation.onrender.com');
  });
}

startServer();
