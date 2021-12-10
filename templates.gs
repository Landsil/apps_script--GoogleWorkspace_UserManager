/****************
This script is responsible for creating the empty pages for code to put data into.

*/

// Main dashboard
function make_sheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

try{
  var Google_pull = spreadsheet.getSheetByName("Google_pull");
  } catch(err) {
    spreadsheet.insertSheet().setName("Google_pull");
  }
  var Google_pull = spreadsheet.getSheetByName("Google_pull");
  Google_pull.setFrozenRows(1) // header
  Google_pull.getRange("1:1").activate();
  Google_pull.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
  Google_pull.getRange("1:999").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long

  Google_pull.getRange("A1").setValue('orgUnitPath');
  Google_pull.getRange("B1").setValue('fullName');
  Google_pull.getRange("C1").setValue('primaryEmail');
  Google_pull.getRange("D1").setValue('title');
  Google_pull.getRange("E1").setValue('department');
  Google_pull.getRange("F1").setValue('manager');
  Google_pull.getRange("G1").setValue('Pronoun');
  Google_pull.getRange("H1").setValue('Building');
  Google_pull.getRange("I1").setValue('id');
  
try{
  var PeopleHR_pull = spreadsheet.getSheetByName("PeopleHR_pull");
  } catch(err) {
    spreadsheet.insertSheet().setName("PeopleHR_pull");
  }
  var PeopleHR_pull = spreadsheet.getSheetByName("PeopleHR_pull");
  PeopleHR_pull.setFrozenRows(1) // header
  PeopleHR_pull.getRange("1:1").activate();
  PeopleHR_pull.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
  PeopleHR_pull.getRange("1:999").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long

  PeopleHR_pull.getRange("A1").setValue('Work Email');
  PeopleHR_pull.getRange("B1").setValue('First Name');
  PeopleHR_pull.getRange("C1").setValue('Last Name');
  PeopleHR_pull.getRange("D1").setValue('Job Role');
  PeopleHR_pull.getRange("E1").setValue('Department');
  PeopleHR_pull.getRange("F1").setValue('Employment Type');
  PeopleHR_pull.getRange("G1").setValue('Reports To');
  PeopleHR_pull.getRange("H1").setValue('Known As');
  PeopleHR_pull.getRange("I1").setValue('Other Name');
  PeopleHR_pull.getRange("J1").setValue('Start Date');
  PeopleHR_pull.getRange("K1").setValue('Final Day in Office');
  PeopleHR_pull.getRange("L1").setValue('Final Day of Employment');
  PeopleHR_pull.getRange("M1").setValue('Fixed Term End Date');
  PeopleHR_pull.getRange("N1").setValue('Location');

try{
  var Google_push = spreadsheet.getSheetByName("Google_push");
  } catch(err) {
    spreadsheet.insertSheet().setName("Google_push");
  }
  var Google_push = spreadsheet.getSheetByName("Google_push");
  Google_push.setFrozenRows(1) // header
  Google_push.getRange("1:1").activate();
  Google_push.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
  Google_push.getRange("1:999").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long

  Google_push.getRange("A1").setValue('id');
  Google_push.getRange("B1").setValue('primaryEmail');
  Google_push.getRange("C1").setValue('title');
  Google_push.getRange("D1").setValue('department');
  Google_push.getRange("E1").setValue('manager');
  Google_push.getRange("F1").setValue('Pronoun');
  Google_push.getRange("G1").setValue('Building');

  Google_push.getRange("A2").setValue('=ARRAYFORMULA(Google_pull!I2:I)');  // Pull list of userID's
  Google_push.getRange("B2").setValue('=ARRAYFORMULA(Google_pull!C2:C)');  // Pull list of email in google for matching and reference

  // title from HR, or from google is person is missing from HR (service accounts and such)
  Google_push.getRange("C2").setValue('=ARRAYFORMULA(   IFERROR(VLOOKUP(B2:B,PeopleHR_pull!A:D,4,False),VLOOKUP(B2:B,Google_pull!C:D,2,False))   )'); 

  // // department from HR, or from google is person is missing from HR (service accounts and such)
  Google_push.getRange("D2").setValue('=ARRAYFORMULA(   IFERROR(VLOOKUP(B2:B,PeopleHR_pull!A:E,5,False),VLOOKUP(B2:B,Google_pull!C:E,3,False))   )');

  // // manager from HR, or from google is person is missing from HR (service accounts and such)
  Google_push.getRange("E2").setValue('=ARRAYFORMULA(   IFERROR(VLOOKUP(B2:B,PeopleHR_pull!A:Q,17,False),VLOOKUP(B2:B,Google_pull!C:F,4,False))   )');

  Google_push.getRange("F2").setValue('=ARRAYFORMULA(Google_pull!G2:G)');  // Pull list of Pronouncs in google (update that sheet to have them show before push)


  SpreadsheetApp.flush();
}