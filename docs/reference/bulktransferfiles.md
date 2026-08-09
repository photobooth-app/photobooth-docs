# Transfer Files from the Photobooth

To download all media files after an event, the following methods are available.
Usually, the /media folder should be downloaded as it stores all the captures original files with no image manipulation directly from the camera and the processed variant.

## Admin Center - Files

This is the easiest option to download any files from the photobooth-app's working directory.
Connect the photobooth to the same WiFi as your computer and open the webinterface.
In the admin center -> files select all folders to download and click "download zip".
The folder is created on the fly and holds all selected data.
Uploading files and create new folders is easy also.

## SCP / SSH

Enable SSH access on the photobooth device.
On windows computers use WinSCP to connect to the device.
Protocol is SFTP, Port usually 22. Username/Password same as login for SSH.

## Synchronizer

Starting from v8 there is a synchronizer using Rclone available. The synchronizer can be used to backup files to a usb storage or remote hosts like FTP, Nextcloud and more.
You can use the synchronizer to backup files and also to upload them to online services so the files can be used in QR codes.