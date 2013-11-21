byuwiki
=======

BYU Class Wiki

Version 0.1.0 - Wed 20 Nov.
* The live server now pulls and restarts automatically!!
* All changes pushed to GitHub are now immediately reflected on our live URL:
  * http://ec2-54-201-62-212.us-west-2.compute.amazonaws.com
* Server Start Commands:
  * SUPERVISOR: sudo forever start -c supervisor wiki.js
  * NODEMON:    sudo forever start -c nodemon wiki.js
* Server Stop Commands:
  * Just change "start" to "stop" in the previous commands

Version 0.0.81 - Tues 19 Nov.
* update.sh modified; Forever service restart now works (absolute file path not necessary)
* update.sh successfully pulls from GitHub, successfully restarts wiki.js forever service
* update.sh is fully functional, HOWEVER, it does not get called automatically when GitHub is updated
  * Possible issue with GitHub WebHook, or endpoint configuration
  * Please test in the following fashion:
     * Make arbitrary modification to dummy HTML page
     * Commit/Push your changes
     * View the live dummy page: http://ec2-54-201-62-212.us-west-2.compute.amazonaws.com
     * Arbitrary changes to dummy page should appear automatically after commit/push
  * NEW: the update.sh script has been copied to the JS controller directory
     * The live server is now responding to the WebHook
     * The server pulls from GitHub automatically
     * The wiki.js forever service appears to crash, does not restart, just stops

Version 0.0.8 - Sat 16 Nov.
* Auto-pull script is up and running
* Server restarts itself when code changes are detected
  * Doesn't currently work with Forever - need to make sure we have a good solution still
  * Need to resolve this before v0.1.0
* Static files serve correctly (e.g. http://ec2-54-201-62-212.us-west-2.compute.amazonaws.com/img/randomimage.png)
* The homepage is still our dummy text message
