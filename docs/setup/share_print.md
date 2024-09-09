# Share and Print

Sharing and printing media items are unified in the share configuration since v4.
Similar to the actions for collages, images, ... the configuration allows multiple share settings. Every setting can be triggered by

- Touchscreen buttons in the gallery
- [GPIO (Raspberry Pi only)](./gpio.md)
- Keyboard input
- [API](../reference/api.md), endpoint /api/share/...

## Working Principle

The user can choose an item in the gallery to share or print. In the background, the photobooth-app invokes a custom command that needs to be set in the configuration beforehand.
This way, sharing/printing works on all platforms for which a command is available.
There is no feedback to the photobooth app about the status of the print job or the printer itself.
If the paper is empty, the photobooth app will not know.

## Example Setup to Print and Share

The configuration is made in the Admin Center -> Config -> Tab: Share.

- Enable shareservice in general
- Set a time to block new jobs. The user needs to wait this time until a new job can be triggered.
- The command to share or print is specific to your platform (Windows/Linux) and your setup.
- In the command ``{filename}`` is replaced by the path of the image to print.
- Test printing with a virtual PDF printer: <https://wiki.ubuntuusers.de/CUPS-PDF/>

### Example Setup Printing on Linux

On Linux printing is realized with CUPS software. The CUPS web interface is usually available at <http://localhost:631/printers/>.
The link only works from the host Linux system itself as it's not available by default to the local network.
Installing a printer is very specific to the individual printer and its required driver / configuration.
Try to install on your own. In the end, make sure that you have a command that prints a photo.

The following is an example print command using [`lp`](https://www.man7.org/linux/man-pages/man1/lp.1.html) to print a file.
You can replace `{filename}` with a path to some image on the computer for manual testing.

```sh title="Example command to print on linux"
lp -d PRINTER_NAME_HERE -o landscape -o fit-to-page {filename}
```

Set the command verified to work in the app including the `{filename}` placeholder.
Admin Center -> Config -> Tab: HardwareInputOutput.

If you use other commands, that work better in your installation, let me know in [GitHub Discussions](https://github.com/photobooth-app/photobooth-app/discussions/).

!!! info
    You might want to update to more recent driver packages. See following guide:
    <https://www.peachyphotos.com/blog/stories/building-modern-gutenprint/>
    Also you might need a ppd file. Here is one for [Canon Selphy CP1300](https://github.com/reuterbal/photobooth/blob/master/supplementals/Canon_SELPHY_CP1300.ppd) that works.

### Example Setup Printing on Windows

As first start use mspaint to test printing. Use following print command on windows.

```ps title="example command to print on windows"
mspaint /p {filename}
```

Set the command verified to work in the app including the {filename} placeholder.
Admin Center -> Config -> Tab: HardwareInputOutput.

If you use other commands, that work better in your installation, let me know in [GitHub Discussions](https://github.com/photobooth-app/photobooth-app/discussions/).

### Example Share to Telegram Group

```bash title="/usr/local/bin/send_photo_to_tg" hl_lines="11-12"
#!/bin/bash
##############################################################
# use arguments:
# first: filename of the image file
# second: caption for the image in telegram
##############################################################

##############################################################
# EDIT BOT INFO BEFORE USE!
##############################################################
BOT_TOKEN="PUT THE BOT TOKEN IN HERE"
CHAT_ID="PUT THE CHAT ID IN HERE"
file_path=""

##############################################################
# Function to send a photo to Telegram
##############################################################
send_photo() {
 local file_path="$1"
 local caption="$2"
 curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendPhoto" \
 -F "chat_id=$CHAT_ID" \
 -F "photo=@$file_path" \
 -F "caption=$caption"
}

##############################################################
# send the photo
##############################################################
send_photo "$1" "$2" > /dev/null 

```

Set following as command in the configuration of the app:

```sh
/usr/local/bin/send_photo_to_tg {filename} "Here is the photo!"
```

- Reference: [Github Discussions, thanks to baumrasen](https://github.com/photobooth-app/photobooth-app/discussions/275#discussioncomment-9582709)

## Troubleshooting

- check photobooth error log
