/******************
Generic data pool from BambooHR
https://documentation.bamboohr.com/docs
https://documentation.bamboohr.com/reference/get-employees-directory-1

*/

function bambooHR_pull() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var bambooHR_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("bambooHR_pull"));
  bambooHR_pull.getRange('A2:X').clear();

  var column = bambooHR_pull.getRange('A1:A').getValues();
  var lastRow = column.filter(String).length;
  var lastColumn = bambooHR_pull.getLastColumn();

/** Details for API call
We will be pulling data from big pre-made report as this is much simpler.
Take report ID from URL, you may have to go back to list of report and open it from there for ID to show in URL.
 */
  const companyDomain = domain
  const endpoint = '/v1/reports/138?format=JSON&onlyCurrent=false'
  const URL = 'https://api.bamboohr.com/api/gateway.php/'+companyDomain+endpoint;

  var headers = {
    'accept' : 'application/json',
     "Authorization":"Basic " + Utilities.base64Encode(bambooHR_key+':'+Utilities.getUuid()),
  };

  var options = {
    method: "GET",
    headers: headers,
    // muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(URL, options);
  var response = JSON.parse(response);
  var data = (response.employees);
  index = 0

    // Populate sheet
    if (data) {
      for (var i = 1; i < data.length; i++) {
        bambooHR_pull.getRange(index + lastRow + i, 1).setValue(data[i]["workEmail"]);
        bambooHR_pull.getRange(index + lastRow + i, 2).setValue(data[i]["fullName1"]);
        bambooHR_pull.getRange(index + lastRow + i, 3).setValue(data[i]["jobTitle"]);
        bambooHR_pull.getRange(index + lastRow + i, 4).setValue(data[i]["department"]);
        bambooHR_pull.getRange(index + lastRow + i, 5).setValue(data[i]["customTeam"]);
        bambooHR_pull.getRange(index + lastRow + i, 6).setValue(data[i]["supervisorEmail"]);
        bambooHR_pull.getRange(index + lastRow + i, 7).setValue(data[i]["customSub-Team"]);
        bambooHR_pull.getRange(index + lastRow + i, 8).setValue(data[i]["customIwocaJobTitles"]);
        bambooHR_pull.getRange(index + lastRow + i, 9).setValue(data[i]["pronouns"]);

      }
    }

  bambooHR_pull.sort(1);
  SpreadsheetApp.flush();
};
