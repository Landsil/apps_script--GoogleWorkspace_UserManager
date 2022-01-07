# apps_script--GoogleWorkspace_UserManager
This code allows you to manage user data via google sheets and apps script.


### Current state
* Currently it works with things I need.
* From the HR system we use (PeopleHR)
* Feature requests and contributions with diffrent HR systems are welcomed.
* Thinkgs possible to udpate atm:
1. Title
2. Department
3. Manager
4. Description (Employee type)
5. Gender Pronoun (custom field)
6. Archived state (You need archived licences to use it)


### How-To's
1. You need to enable "Services", there in note on top of the code
2. As provided code is not going to push anything, there is 1 line to un-comment and 1 to comment out.
3. Update can be slow, it runs 1 API call per user (this seems to be way API is made to work)
4. At the moment I get scarry but unrelevant error at the end, no idea why atm.

### Using it without HR system
1. Modify `main_pull()` in Main.gs to remove HR, run it to pull data from Google.
2. You can force rows move by updating "Force_Sync" column to "true" or put correct HR data in HR sheet manually.
3. Assemble data = `main_data()` will compare HR and Google data and move diffrentces to "Google_push"
4. Some data will be google only (eg. "Archived" status), you can update it in "Google_push" or in "Google_pull" if you are still using `main_data()`
