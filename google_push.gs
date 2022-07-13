/**************************************************************
This code is used to move data around so that payload in google_push is only only users that actually have any changes, saves on processing time.
*/

function load_googleSource() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_pull"));

  var column = Google_pull.getRange('A1:A').getValues();
  var lastRow = column.filter(String).length;
  var lastColumn = Google_pull.getLastColumn();
  var sourceGoogle = Google_pull.getRange(2, 1, lastRow-1, lastColumn).getValues();  // start row, start column, number of rows, number of columns
  // console.log(sourceGoogle)
  return sourceGoogle
};

function load_bambooHRSource() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var BambooHR_pull = SpreadsheetApp.setActiveSheet(ss.getSheetByName("BambooHR_pull"));

  var column = BambooHR_pull.getRange('A1:A').getValues();
  var lastRow = column.filter(String).length;
  var lastColumn = BambooHR_pull.getLastColumn();
  var bambooHRSource = BambooHR_pull.getRange(2, 1, lastRow, lastColumn).getValues();  // start row, start column, number of rows, number of columns
  //console.log(bambooHRSource)
  return bambooHRSource
};


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
        // console.log('check '+row[14])
        {
          // console.log(gRow[2],"-",bRow[0]," | ",gRow[3],"-" ,bRow[2]," | ",gRow[4],"-" ,bRow[3]," | ",gRow[5],"-" ,bRow[5]," | ",gRow[6],"-" ,bRow[8])
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
  console.log(newArray)
  return newArray
};

function save_source(newArray) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_push = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_push"));

  Google_push.getRange("A2:I").clearContent();  // Clear the space

  // This decided where to post. Starts after header.
  var lastRow = Math.max(Google_push.getRange(2, 1).getLastRow(), 1);
  var index = 0;
  // var newArray = make_newArray(sourceGoogle, hrSource);   // You this only if you want to run this step manually.
  var data = newArray;

  // Populate sheet by looping thru records in our list of dictonaries and pulling data we need into correct columns.
  for (var i = 0; i < data.length; i++) {
    Google_push.getRange(index + lastRow + i, 1).setValue(data[i]['ID']);
    Google_push.getRange(index + lastRow + i, 2).setValue(data[i]["primaryEmail"]);
    Google_push.getRange(index + lastRow + i, 3).setValue(data[i]["title"]);
    Google_push.getRange(index + lastRow + i, 4).setValue(data[i]["department"]);
    Google_push.getRange(index + lastRow + i, 5).setValue(data[i]["manager"]);
    Google_push.getRange(index + lastRow + i, 6).setValue(data[i]["Gender_pronoun"]);
    // Building stuff here or remove all together 
    Google_push.getRange(index + lastRow + i, 8).setValue(data[i]["description"]);
    Google_push.getRange(index + lastRow + i, 9).setValue(data[i]["Archived"]);

  }

  // This actually posts data when it's ready instead of making many changes one at a time.
  Google_push.sort(1);  // sort by column 1
  SpreadsheetApp.flush();
}

// This is what you use to run all the steps.
function main_data() {
  var sourceGoogle = load_googleSource();
  var bambooHRSource = load_bambooHRSource();
  var newArray = make_newArray(sourceGoogle, bambooHRSource);
  save_source(newArray);
};
