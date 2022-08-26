/****************
This script is responsible for creating the empty sheets for code to put data into.
You will probably want to update BambooHR_pull to fit your particular source of truth.
Please make sure to keep content of the columns the same or you will have to re-do column calls in contentMover.gs 

*/

// This will create your "database's"
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
    Google_pull.getRange("J1").setValue('description');
    Google_pull.getRange("K1").setValue('Archived');
    // Google_pull.getRange("L1").setValue('aliases');
    Google_pull.getRange("O1").setValue('Force_Sync');
    
  try{
    var BambooHR_pull = spreadsheet.getSheetByName("BambooHR_pull");
    } catch(err) {
      spreadsheet.insertSheet().setName("BambooHR_pull");
    }
    var BambooHR_pull = spreadsheet.getSheetByName("BambooHR_pull");
    BambooHR_pull.setFrozenRows(1) // header
    BambooHR_pull.getRange("1:1").activate();
    BambooHR_pull.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
    BambooHR_pull.getRange("1:999").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long
  
    BambooHR_pull.getRange("A1").setValue('Work Email');
    BambooHR_pull.getRange("B1").setValue('Name');
    BambooHR_pull.getRange("C1").setValue('Job Role');
    BambooHR_pull.getRange("D1").setValue('Department');
    BambooHR_pull.getRange("E1").setValue('customTeam');
    BambooHR_pull.getRange("F1").setValue('supervisorEmail');
    BambooHR_pull.getRange("G1").setValue('customSub-Team');
    BambooHR_pull.getRange("H1").setValue('customIwocaJobTitles');
    BambooHR_pull.getRange("I1").setValue('pronouns');
    BambooHR_pull.getRange("J1").setValue('hireDate');
    BambooHR_pull.getRange("K1").setValue('contractEndDate');
    BambooHR_pull.getRange("L1").setValue('customFinalDayofEmployment');
    BambooHR_pull.getRange("M1").setValue('customLastWorkingDay');
    BambooHR_pull.getRange("N1").setValue('firstName')
    BambooHR_pull.getRange("O1").setValue('lastName')
    BambooHR_pull.getRange("P1").setValue('homeEmail')
  
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
    Google_push.getRange("H1").setValue('description');
    Google_push.getRange("I1").setValue('Archived');
    // Google_push.getRange("J1").setValue('aliases');
  
  try{
    var Google_create = spreadsheet.getSheetByName("Google_create");
    } catch(err) {
      spreadsheet.insertSheet().setName("Google_create");
    }
    var Google_create = spreadsheet.getSheetByName("Google_create");
    Google_create.setFrozenRows(1) // header
    Google_create.getRange("1:1").activate();
    Google_create.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold"); // center and bold
    Google_create.getRange("1:999").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);  // Clip when text to long
  
    Google_create.getRange("A1").setValue('primaryEmail');
    Google_create.getRange("B1").setValue('givenName');
    Google_create.getRange("C1").setValue('familyName');
    Google_create.getRange("D1").setValue('homeEmail');
    Google_create.getRange("F1").setValue('hireDate');
    Google_create.getRange("H1").setValue('Make');
    Google_create.getRange("H2:H").setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox());
  
    SpreadsheetApp.flush();
  }