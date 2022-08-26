/**************************************************************
This code is used to move data around so that it doesn't have to by done by API functions.
It "should" make it easier to find problems.
*/

// Load all of Google data
function load_googleSource() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_pull"));

  var lastRowG = Google_pull.getRange('A1:A').getValues().filter(String).length + 1;
  var lastColumn = Google_pull.getLastColumn();
  var sourceGoogle = Google_pull.getRange(2, 1, lastRowG, lastColumn).getValues();  // start row, start column, number of rows, number of columns
  return sourceGoogle
};

// Load all of BambooHR data
function load_bambooHRSource() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var BambooHR_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("BambooHR_pull"));

  var lastRowB = BambooHR_pull.getRange('A1:A').getValues().filter(String).length + 1;
  var lastColumnB = BambooHR_pull.getLastColumn();
  var bambooHRSource = BambooHR_pull.getRange(2, 1, lastRowB, lastColumnB).getValues();  // start row, start column, number of rows, number of columns
  return bambooHRSource
};

/**************************************************************
This array will be used to update current Google users with data from BambooHR
*/
function make_newArray(sourceGoogle, bambooHRSource) {
  // const hrArray = hrSource
  const gArray = sourceGoogle
  const bArray = bambooHRSource
  var newArray = []

  for (const gRow of gArray) {
    if (gRow[14] == true)   // This will forcefully copy marked rows from Google_pull into Google_push
    {
      newArray.push(
        {
          "ID": gRow[8],
          "primaryEmail": gRow[2],
          "title": gRow[3],
          "department": gRow[4],
          "manager": gRow[5],
          "description": gRow[9],
          "Gender_pronoun": gRow[6],
          "Archived": gRow[10],
        }
      )
    } else {
      for (const bRow of bArray) {
        if (gRow[2] === bRow[0])     // If nothing isn't set to force this will check if that email is in HR sheet
        {
          if (gRow[3] !== bRow[2] || gRow[4] !== bRow[3] || gRow[5] !== bRow[5] || gRow[6] !== bRow[8])   // And this will compare HR details changes
          // 
          {
            newArray.push(
              {
                "ID": gRow[8],
                "primaryEmail": gRow[2],
                "title": bRow[2],
                "department": bRow[3],
                "manager": bRow[5],
                "description": gRow[9],
                "Gender_pronoun": bRow[8],
                "Archived": gRow[10],
              }
            )
          }
        }
      }
    };
  };
  return newArray
};

// Save previous array to Google_push sheet
function save_source(newArray) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_push = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_push"));
  Google_push.getRange("A2:I").clearContent();  // Clear the space

  var lastRow = Google_push.getRange('A1:A').getValues().filter(String).length + 1;
  // var newArray = make_newArray(sourceGoogle, hrSource);   // You this only if you want to run this step manually.
  var data = newArray;

  // Populate sheet by looping thru records in our list of dictionaries and pulling data we need into correct columns.
  for (var i = 0; i < data.length; i++) {
    Google_push.getRange(lastRow + i, 1).setValue(data[i]['ID']);
    Google_push.getRange(lastRow + i, 2).setValue(data[i]["primaryEmail"]);
    Google_push.getRange(lastRow + i, 3).setValue(data[i]["title"]);
    Google_push.getRange(lastRow + i, 4).setValue(data[i]["department"]);
    Google_push.getRange(lastRow + i, 5).setValue(data[i]["manager"]);
    Google_push.getRange(lastRow + i, 6).setValue(data[i]["Gender_pronoun"]);
    Google_push.getRange(lastRow + i, 8).setValue(data[i]["description"]);
    Google_push.getRange(lastRow + i, 9).setValue(data[i]["Archived"]);
  }

  // This actually posts data when it's ready instead of making many changes one at a time.
  Google_push.sort(1);  // sort by column 1
  SpreadsheetApp.flush();
}


/**************************************************************
Compare bambooHR and Google and save users that need to be created.
*/
function make_newUserArray(bambooHRSource) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_pull"));
  var lastRowG = Google_pull.getRange('A1:A').getValues().filter(String).length + 1;

  const bArray = bambooHRSource
  var newUserArray = []
  const gArray = []

  var gData = Google_pull.getRange(2, 3, lastRowG, 1).getValues();  // Load 3rd column (one with user email)
  for (const row of gData) {
    gArray.push(row[0]);
  };

  // Check if people already left, ignore them if yes
  for (const bRow of bArray) {
    const newHire = Date.parse(bRow[9]) > Date.now()
    const isUserMissing = !gArray.includes(bRow[0])
    if (isUserMissing && newHire) {
      newUserArray.push(
        {
          "primaryEmail": bRow[0],
          "givenName": bRow[13],
          "familyName": bRow[14],
          "hireDate": bRow[9],
          "homeEmail": bRow[15],
        }
      )
    }

  }
  return newUserArray
};

// Save previous array to Google_create sheet
function save_NewUserSource(newUserArray) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_create = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_create"));
  Google_create.getRange("A2:G").clearContent();  // Clear the space

  // This decided where to post. Starts after header.
  var lastRow = Google_create.getRange('A1:A').getValues().filter(String).length + 1;
  var data = newUserArray;

  // Populate sheet by looping thru records in our list of dictionaries and pulling data we need into correct columns.
  for (var i = 0; i < data.length; i++) {
    Google_create.getRange(lastRow + i, 1).setValue(data[i]['primaryEmail']);
    Google_create.getRange(lastRow + i, 2).setValue(data[i]["givenName"]);
    Google_create.getRange(lastRow + i, 3).setValue(data[i]["familyName"]);
    Google_create.getRange(lastRow + i, 4).setValue(data[i]["homeEmail"]);
    Google_create.getRange(lastRow + i, 6).setValue(data[i]["hireDate"]);
  }

  // This actually posts data when it's ready instead of making many changes one at a time.
  Google_create.sort(6);  // sort by column 1
  SpreadsheetApp.flush();
}


// This is what you use to run all the steps as part of automation
function main_data() {
  var sourceGoogle = load_googleSource();
  var bambooHRSource = load_bambooHRSource();
  var newArray = make_newArray(sourceGoogle, bambooHRSource);
  var newUserArray = make_newUserArray(bambooHRSource);
  save_source(newArray);
  save_NewUserSource(newUserArray);
};
