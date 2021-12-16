/*******************************************************************************************************************************************
Update users in a G Suite domain.
You will need to enable at least Direcory API and admin SDK
https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/update

If you are updating any admins you will need to run this as a Super Admin

 */

function loadUserData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Google_push = SpreadsheetApp.setActiveSheet(ss.getSheetByName("Google_push"));

  var column = Google_push.getRange('A1:A').getValues();
  var lastRow = column.filter(String).length;
  //Logger.log(lastRow);
  //var lastRow = 39;           // This will push first 3 users only. Comment it out to push to everyone.

  var data = Google_push.getRange(2,1,lastRow,6).getValues(); //(2,1,lastRow,6) start row, start column, number of rows, number of columns
  //Logger.log(data);
  return data
};

// This is actuall call we are making to Google
function update_user(userId, userTitle, userDept, userManager, userPronoun, userType) {
  var update = {
    organizations: 
      [
        {
        title: userTitle,
        department: userDept,
        customType: userType
        }
      ],
      relations: [
        {
          value: userManager,
          type: 'manager'
        }
      ],
      customSchemas:
      {
        Info : {
          Gender_pronoun: userPronoun
        }
      }
  };
  Logger.log(update)    // This will let you see what you are pushing to double check before first live push.
  //update = AdminDirectory.Users.update(update, userId);  // This will update your org, you have to un-comment it to work.
  
};

function main_push(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('You are about to update users in production, are you sure?', ui.ButtonSet.YES_NO);

    if (response == ui.Button.YES) {
    Logger.log('Ok, getting on with it.');

    const data = loadUserData()
    for (const user of data){
      //Logger.log(user)
      update_user(user[0],user[2],user[3],user[4],user[5],user[7])
    };
  } else {
    Logger.log('The user clicked "No" or the close button in the dialog\'s title bar.');
  };
};
