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
    functionName : 'main_push'
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
