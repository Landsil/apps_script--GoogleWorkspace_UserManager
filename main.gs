/*****************************************
Up to date code at https://github.com/Landsil/apps_script--GoogleWorkspace_UserManager
This scrip is made to be run in automated manner via triggers, assumption would be to run it at mindnight.
Menu options are added for setup and troubleshooting purpose but you can run this in manual mode, especially if you don't have HR integration.

It's expeceted you will run this on your super admin account to ensure you can update all users including other admins.

 */ 
// Menu options
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : 'Main Pull',
    functionName : 'main_pull'
  },
  {
  name : 'Assemble data',
  functionName : 'main_data'
  },
  {
    name : '! Push changes to Production !',
    functionName : 'update_user'
  },
  {
    name : 'Make Sheets',
    functionName : 'make_sheets'
  },
                ];
  sheet.addMenu('Actions', entries);
};

// Get all tokens and codes from project properties
var scriptProperties = PropertiesService.getScriptProperties()
    peopleHR_key = scriptProperties.getProperty("hr_token")
    querry_name = scriptProperties.getProperty("querry_name");


function main_pull(){
  google_pull();
  peopleHR_pull();
};

// This will run everything (for automation)
function do_all_AUTO(){
  main_pull();
  main_data();
  update_user();
};
