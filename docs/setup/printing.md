# Printing

Setup printing allows to get a hardcopy of the images and collages.
Prints can be triggered by

- Touchscreen button in gallery
- [GPIO (Raspberry Pi only)](./gpio.md)
- keyboard input
- [API](../reference/api.md)

## Working Principle

The user can choose an image in the gallery to print. In the background, the photobooth-app invokes a custom command, that needs to be set.
This way, printing works on all platforms where a print command is available.
There is no feedback to photobooth app about the status of the print job or the printer itself.
If the paper is empty the photobooth app is not aware of that.

## General Setup

The configuration is made in the Admin Center -> Config -> Tab: HardwareInputOutput.

- Enable printservice in general
- Set a time to block new print jobs. The user needs to wait this time until a new print job can be triggered.
- The command to print is specific to your platform (Windows/Linux) and setup.
- In the command ``{filename}`` is replaced by the path of the image to print.
- Test printing with a virtual PDF printer: <https://wiki.ubuntuusers.de/CUPS-PDF/>

### Setup on Linux

On Linux printing is realized with CUPS software. The cups webinterface is available on <http://localhost:631/printers/> usually.
The link only works from the Linux system itself, it's not available in the local network.
Installing a printer is very individual to the specific printer and the setup.
Try to install on your own. In the end, make sure that you have a command that prints a photo.

Following is an example command to print.
Instead of {filename} point to some image on the computer for testing.

```sh title="example command to print on linux"
lp -d PRINTER_NAME_HERE -o landscape -o fit-to-page {filename}
```

Set the command verified to work in the app including the {filename} placeholder.
Admin Center -> Config -> Tab: HardwareInputOutput.

If you use other commands, that work better in your installation, let me know in [GitHub Discussions](https://github.com/photobooth-app/photobooth-app/discussions/).

!!! info
    You might want to update to more recent driver packages. See following guide:
    <https://www.peachyphotos.com/blog/stories/building-modern-gutenprint/>
    Also you might need a ppd file. Here is one for [Canon Selphy CP1300](https://github.com/reuterbal/photobooth/blob/master/supplementals/Canon_SELPHY_CP1300.ppd) that works.

### Setup on Windows

As first start use mspaint to test printing. Use following print command on windows.

```ps title="example command to print on windows"
mspaint /p {filename}
```

Set the command verified to work in the app including the {filename} placeholder.
Admin Center -> Config -> Tab: HardwareInputOutput.

If you use other commands, that work better in your installation, let me know in [GitHub Discussions](https://github.com/photobooth-app/photobooth-app/discussions/).

## Troubleshooting

- check photobooth error log
