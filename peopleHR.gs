/*******************************************************************************************************************************************
Pull details on users from PeopleHR
It requires your HR admins to make a "querry" report for you that will contain this data.
API documentaion at: https://apidocs.peoplehr.com/#tag/Query
Live test can also run at: https://api.peoplehr.net/pages/functional

You may wany to replace this code with any other HR system you have or jsut add those details manually, code will still work at long as it's in a correct column.

*/
function peopleHR_pull() {
  var URL = "https://api.peoplehr.net/Query"; // From their documentation.
  var payload = {
           "APIKey": peopleHR_key,                  // We are calling our project properties variable
           "Action": "GetQueryResultByQueryName",   // From their documentation.
           "QueryName": querry_name};               // We are calling our project properties variable
  var options = {
          "method" : "post",
          "payload" : JSON.stringify(payload),
        };

  // Actuall call using FetchApp
  var response = UrlFetchApp.fetch(URL, options);
  //Assebling responce
  var dataAll = JSON.parse(response.getContentText());
  var data = dataAll.Result;

  // Logger.log(data)
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var PeopleHR_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("PeopleHR_pull"));
  // Clear content except header all the way to "O" column. TODO: make it find cells with content and cleare those.
  PeopleHR_pull.getRange("A2:N").clearContent();
  
  // This decided where to post. Starts after header.
  var lastRow = Math.max(PeopleHR_pull.getRange(2, 1).getLastRow(),1);
  var index = 0;
    
  // Populate sheet by looping thru records in our list of dictonaries and pulling data we need into correct columns.
  for(var i = 0; i < data.length; i++ )
  {
    PeopleHR_pull.getRange(index + lastRow + i, 1).setValue(data[i]["Work Email"]);
    PeopleHR_pull.getRange(index + lastRow + i, 2).setValue(data[i]["First Name"]);
    PeopleHR_pull.getRange(index + lastRow + i, 3).setValue(data[i]["Last Name"]);
    PeopleHR_pull.getRange(index + lastRow + i, 4).setValue(data[i]["Job Role"]);
    PeopleHR_pull.getRange(index + lastRow + i, 5).setValue(data[i]["Department"]);
    PeopleHR_pull.getRange(index + lastRow + i, 6).setValue(data[i]["Employment Type"]);
    PeopleHR_pull.getRange(index + lastRow + i, 7).setValue(data[i]["Reports To"]);
    PeopleHR_pull.getRange(index + lastRow + i, 8).setValue(data[i]["Known As"]);
    PeopleHR_pull.getRange(index + lastRow + i, 9).setValue(data[i]["Other Name"]);
    PeopleHR_pull.getRange(index + lastRow + i, 10).setValue(data[i]["Start Date"]);
    PeopleHR_pull.getRange(index + lastRow + i, 11).setValue(data[i]["Final Day in Office"]);
    PeopleHR_pull.getRange(index + lastRow + i, 12).setValue(data[i]["Final Day of Employment"]);
    PeopleHR_pull.getRange(index + lastRow + i, 13).setValue(data[i]["Fixed Term End Date"]);
    PeopleHR_pull.getRange(index + lastRow + i, 14).setValue(data[i]["Location"]);

    
    //debug >> Full answer
    //PeopleHR_pull.getRange(index + lastRow + i, 17).setValue(data);
  }
  
// This actually posts data when it's ready instead of making many changes one at a time.
  PeopleHR_pull.sort(1);  // sort by column 1
SpreadsheetApp.flush();
}
