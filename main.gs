// Menu options
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : 'Google Pull',
    functionName : 'downloadUsers'
  },
{
    name : 'PeopleHR Pull',
    functionName : 'PeopleHR'
  },
  {
    name : '! Push changes to Production !',
    functionName : 'main'
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
