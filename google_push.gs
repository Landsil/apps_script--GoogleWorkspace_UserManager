/*******************************************************************************************************************************************
Update users in a G Suite domain.
You will need to enable at least Direcory API and admin SDK
https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/update

If you are updating any admins you will need to run this as a Super Admin

---------

This is a very important part where we load spreadsheet "Google_push" into array of arrays that will let us call values by key
This way if you ever add new data you only have to match key to row under dataArray.push
Make sure this is correct after making any changes as errors here will result in things like pushing phone number as job title for eg.
*/
function loadUserData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_push = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_push"));

  var column = Google_push.getRange('A1:A').getValues();
  var lastRow = column.filter(String).length;
  var lastColumn = Google_push.getLastColumn();
  // var lastRow = 3;           // This will push first 3 users only. Comment it out to push to everyone.
  var dataArray = []

  if (lastRow > 1) {
    var data = Google_push.getRange(2, 1, lastRow - 1, lastColumn).getValues(); //(2,1,lastRow,6) start row, start column, number of rows, number of columns
    // Logger.log(data);
    for (const row of data) {
      dataArray.push(
        {
          "ID": row[0],   // All the values here are based on columns in a sheet A=0, B=1
          "primaryEmail": row[1],
          "title": row[2],
          "department": row[3],
          "manager": row[4],
          "Gender_pronoun": row[5],
          "description": row[7],
          "archived": row[8],
        }
      );
    };
  } else {
    console.log(`No changes`)
  }
  // Logger.log(dataArray)
  return dataArray
};


/**** 
This is an actuall call we are making to google.
var "update" contains a replica of user JSON we pulled from google but contaning only data we care to update.
*/
function update_user(dataArray) {
  var dataArray = loadUserData(dataArray);   // You this only if you want to run this step manually.
  // Logger.log(dataArray)

  if (dataArray.length > 0) {
    for (var i = 0; i < dataArray.length; i++) {
      var update = {
        organizations:
          [
            {
              title: dataArray[i]['title'],
              department: dataArray[i]['department'],
              description: dataArray[i]['description']
            }
          ],
        relations: [
          {
            value: dataArray[i]['manager'],
            type: 'manager'
          }
        ],
        customSchemas:
        {
          Info: {
            Gender_pronoun: dataArray[i]['Gender_pronoun']
          }
        },
        // "archived": dataArray[i]['archived'],    // This is a sensitive change so I'm shipping it commented out.
      };
      // Logger.log(update)
      var update = AdminDirectory.Users.update(update, dataArray[i]['ID']);  // This will update your org, you have to un-comment it to work.
      //Logger.log(update)   // This will let you see what you are pushing to double check before first live push.
    };
  } else {
    console.log(`No changes`)
  }
};

function manual_push() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('You are about to update users in production, are you sure?', ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    Logger.log('Ok, getting on with it.');
    update_user();

  } else {
    Logger.log('The user clicked "No" or the close button in the dialog\'s title bar.');
  };
};
