/**
 * LIFORA CANADA - GOOGLE FORMS GENERATOR SCRIPT
 * 
 * Bypasses OAuth blocks by running Google-native script execution.
 * This runs directly in your Google Account and creates both forms in your Google Drive instantly.
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/ and click "New Project".
 * 2. Delete any default code in code.gs and paste this entire script.
 * 3. Click the "Save" icon (or press Ctrl+S / Cmd+S).
 * 4. Click the "Run" button at the top toolbar.
 * 5. Grant permissions if Google asks (click "Advanced" and then "Go to Untitled project (unsafe)" to proceed).
 * 6. Look at the "Execution log" at the bottom of the editor.
 * 7. Copy the links provided and paste them into the Setup Hub of your Lifora Canada App!
 */

function createLiforaForms() {
  // 1. Create Volunteer Form
  var volForm = FormApp.create('Become a Volunteer - Lifora Canada');
  volForm.setDescription('Thank you for your interest in volunteering with Lifora Canada. Please fill out this form to register as a volunteer.');
  
  // Add matching questions with corresponding type constraints
  volForm.addTextItem().setTitle('Full Name').setRequired(true).setHelpText('Please enter your first and last name.');
  volForm.addTextItem().setTitle('Email Address').setRequired(true).setHelpText('This is where we will contact you.');
  volForm.addTextItem().setTitle('City & Province').setRequired(true).setHelpText('e.g. Toronto, ON');
  
  var volArea = volForm.addMultipleChoiceItem();
  volArea.setTitle('Preferred Volunteering Area')
         .setRequired(true)
         .setChoiceValues([
           'Community Support', 
           'Sustainability Projects', 
           'Digital & Creative (Remote)', 
           'Administration'
         ]);
         
  volForm.addParagraphTextItem().setTitle('Briefly describe your skills and availability').setRequired(false);
  
  // 2. Create Partner Form
  var partnerForm = FormApp.create('Partner With Us - Lifora Canada');
  partnerForm.setDescription('Ready to align your organization with measurable social good? Submit your partnership goals below.');
  
  // Add matching questions with corresponding type constraints
  partnerForm.addTextItem().setTitle('Company/Organization Name').setRequired(true);
  partnerForm.addTextItem().setTitle('Contact Name & Title').setRequired(true);
  partnerForm.addTextItem().setTitle('Work Email Address').setRequired(true);
  partnerForm.addParagraphTextItem().setTitle('Briefly describe your partnership goals').setRequired(true);
  
  // Output Links Into Logging Console
  console.log('========================================================================');
  console.log('🔥 SUCCESS! BOTH FORMS HAVE BEEN CREATED IN YOUR GOOGLE DRIVE!');
  console.log('========================================================================');
  console.log('');
  console.log('1. BECOME A VOLUNTEER FORM LINKS:');
  console.log('👉 Public View/Embed Link (PASTE THIS INTO THE LIVELINKS SETUP HUB):');
  console.log(volForm.getPublishedUrl());
  console.log('');
  console.log('✏️ Edit Form Link (To manage questions, change theme, or view answers):');
  console.log(volForm.getEditUrl());
  console.log('');
  console.log('------------------------------------------------------------------------');
  console.log('');
  console.log('2. PARTNER WITH US FORM LINKS:');
  console.log('👉 Public View/Embed Link (PASTE THIS INTO THE LIVELINKS SETUP HUB):');
  console.log(partnerForm.getPublishedUrl());
  console.log('');
  console.log('✏️ Edit Form Link (To manage questions, change theme, or view answers):');
  console.log(partnerForm.getEditUrl());
  console.log('');
  console.log('========================================================================');
}
