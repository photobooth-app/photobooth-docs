# Bulk Transfer Files from/to Photobooth

This page is about methods to download all files after an event from the photobooth.
Using the admin center is preferred method in general.

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

## Filetransfer-Service

This service can be used copy mediaitems to USB-drive.

!!! info
    Starting with Debian Bookworm mounting the usb drive automatically can fail because old unmaintained packages were removed from the distribution and replacement packages could behave different so the photobooth-app cannot detect the usb drive.

    The other methods are preferred for bulk transfer of data.

To use this type of datatransfer enable the filetransferservice in the admin center.
Once enabled, and a usb stick is inserted in the device, the mediaitems are copied once.
If new images are added later to the gallery, these images are not copied until the drive is unplugged and plugged in again.
