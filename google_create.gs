/*******************************************************************************************************************************************
Create a new user in your Google Workspace.
You will need to enable at least Directory API and admin SDK
https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/insert

You need to run is as admin with appropriate access.

---------

This script has some custom settings that you will probably want to change.
- orgUnitPath
*/

// Generic SHA512 implementation
function SHA512(input_string) {
  var hexstr = '';
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512, input_string);
  for (i = 0; i < digest.length; i++) {
    var val = (digest[i] + 256) % 256;
    hexstr += ('0' + val.toString(16)).slice(-2);
  }
  return hexstr;
}

// Assemble set of payloads 
function loadUserData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_create = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_create"));
  var lastRow = Math.max(Google_create.getRange("A1:A").getLastRow(), 1);
  var lastColumn = Google_create.getLastColumn();
  var userArray = []

  if (lastRow > 1) {
    var data = Google_create.getRange(2, 1, lastRow - 1, lastColumn).getValues(); //(2,1,lastRow,6) start row, start column, number of rows, number of columns
    for (const row of data) {
      let makeUser = row[7]
      if (makeUser) {
        userArray.push(
          {
            "name": {
              "givenName": row[1],
              "familyName": row[2],
            },
            "primaryEmail": row[0],   // All the values here are based on columns in a sheet A=0, B=1
            "recoveryEmail": row[3],
            "orgUnitPath": "/Onboarding",
            "changePasswordAtNextLogin": true,
            "password": SHA512(Math.random()).substring(row[0].length, row[0].length + 30),
          }
        );
      };
    }
  }
  return userArray
};


/**** 
This is an actual call we are making to google.
We will iterate over entries in dataArray making API call for each.
*/

function makeUser(userArray) {
  var userArray = loadUserData();   // You this only if you want to run this step manually.

  if (userArray.length > 0) {
    for (var i = 0; i < userArray.length; i++) {
      try {
        // var update = AdminDirectory.Users.insert(userArray[i]);  // This will update your org, you have to un-comment it to work.
        console.info("User made : " + update.id)
      } catch (e) {
        console.error('makeUser() yielded an error: ' + e);
      }
    };
  }
};

