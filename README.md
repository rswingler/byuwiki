byuwiki
=======

BYU Class Wiki

Version 0.0.8 - Sat 16 Nov.
* Auto-pull script works, but is not called on the server when GitHub is updated (HTTP hook not working??)
* Server does not yet restart itself when code changes are detected (Script is good, but is not being called on server)
  * Forever service restart script has been modified, now works
* Static files serve correctly (e.g. http://ec2-54-201-62-212.us-west-2.compute.amazonaws.com/img/randomimage.png)
* The homepage is still our dummy text message
