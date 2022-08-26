/******************
We will be pulling data from big pre-made report as this is much simpler.
Take report ID from URL, you may have to go back to list of report and open it from there for ID to show in URL.

https://documentation.bamboohr.com/docs

*/

function bambooHR_pull() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var bambooHR_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("bambooHR_pull"));
  bambooHR_pull.getRange('A2:X').clear();
  var lastRow = bambooHR_pull.getRange('A1:A').getValues().filter(String).length + 1;

  const companyDomain = domain  // From your script properties in main.gs
  const endpoint = '/v1/reports/138?format=JSON&onlyCurrent=false'
  const URL = 'https://api.bamboohr.com/api/gateway.php/' + companyDomain + endpoint;

  var headers = {
    'accept': 'application/json',
    "Authorization": "Basic " + Utilities.base64Encode(bambooHR_key + ':' + Utilities.getUuid()),
  };

  var options = {
    method: "GET",
    headers: headers,
    // muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(URL, options);
  var response = JSON.parse(response);
  var data = (response.employees);

  // Populate sheet
  if (data) {
    for (var i = 0; i < data.length; i++) {
      bambooHR_pull.getRange(lastRow + i, 1).setValue(data[i]["workEmail"]);
      bambooHR_pull.getRange(lastRow + i, 2).setValue(data[i]["fullName1"]);
      bambooHR_pull.getRange(lastRow + i, 3).setValue(data[i]["jobTitle"]);
      bambooHR_pull.getRange(lastRow + i, 4).setValue(data[i]["department"]);
      bambooHR_pull.getRange(lastRow + i, 5).setValue(data[i]["customTeam"]);
      bambooHR_pull.getRange(lastRow + i, 6).setValue(data[i]["supervisorEmail"]);
      bambooHR_pull.getRange(lastRow + i, 7).setValue(data[i]["customSub-Team"]);
      bambooHR_pull.getRange(lastRow + i, 8).setValue(data[i]["customIwocaJobTitles"]);
      bambooHR_pull.getRange(lastRow + i, 9).setValue(data[i]["pronouns"]);

      if (data[i]["hireDate"] === "0000-00-00") { hireDate = "" }
      else { hireDate = data[i]["hireDate"] };
      bambooHR_pull.getRange(lastRow + i, 10).setValue(hireDate);

      if (data[i]["contractEndDate"] === "0000-00-00") { contractEndDate = "" }       // For contractors, this is expect to change multiple times before lastDay
      else { contractEndDate = data[i]["contractEndDate"] };
      bambooHR_pull.getRange(lastRow + i, 11).setValue(contractEndDate);

      if (data[i]["customFinalDayofEmployment"] === "0000-00-00") { customFinalDayofEmployment = "" }    // This is probably after the time off, actual contract ends
      else { customFinalDayofEmployment = data[i]["customFinalDayofEmployment"] };
      bambooHR_pull.getRange(lastRow + i, 12).setValue(customFinalDayofEmployment);

      if (data[i]["customLastWorkingDay"] === "0000-00-00") { customLastWorkingDay = "" }    // Day when access can be disabled
      else { customLastWorkingDay = data[i]["customLastWorkingDay"] };
      bambooHR_pull.getRange(lastRow + i, 13).setValue(customLastWorkingDay);

      bambooHR_pull.getRange(lastRow + i, 14).setValue(data[i]["firstName"]);
      bambooHR_pull.getRange(lastRow + i, 15).setValue(data[i]["lastName"]);
      bambooHR_pull.getRange(lastRow + i, 16).setValue(data[i]["homeEmail"]);
    }
  }

  bambooHR_pull.sort(1);
  SpreadsheetApp.flush();
};