/*****************************************
Up to date code at https://github.com/Landsil/apps_script--GoogleWorkspace_UserManager
This scrip is made to be run in automated manner via triggers, assumption would be to run it at midnight.
Menu options are added for setup and troubleshooting purpose but you can run this in manual mode, especially if you don't have HR integration.

It's expected you will run this on your super admin account to ensure you can update all users including other admins.

Considering important of this code you should find and monitor logs for it in GCP.
Go to https://console.cloud.google.com/cloud-resource-manager and search for project name in main search.
Then search for "Stackdriver API" and enable it.
Finally your logs will be in https://console.cloud.google.com/logs (full URL will change to be exact for your project)

You may wish to change retention at https://console.cloud.google.com/logs/storage

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
    functionName : 'manual_push'
  },
    {
    name : '! Make new users !',
    functionName : 'makeUser'
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
    bambooHR_key = scriptProperties.getProperty("bamboo_token")
    domain = scriptProperties.getProperty("domain")
                 ;


function main_pull(){
  google_pull();
  bambooHR_pull();
};

// This will run everything (for automation)
function do_all_AUTO(){
  main_pull();
  main_data();
  update_user();
};