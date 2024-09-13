# Printer Setup Example

The following is a detailed example of how to setup a Dai Nippon Printing (DNP) DS-RX1HS printer for use with photobooth-app. The DS-RX1HS is a very popular dye sublimation photo printer commonly used for on-site event printing. This guide may also assist you in setting up any other type of printer that works with standard print spooling services on your operating system.

## Print Function Setup

Please follow the initial steps in the [Share and Print](../setup/share_print.md) guide to enable Print functionality in the photobooth app. Once you have the Print button enabled, continue following this guide to setup the print command suitable for your OS and printing needs.

## Image Output Setup

In addition to setting up your printer, you'll need to make sure your output images from the photobooth app are properly dimensioned for your printer and print media. This includes scaling, cropping, and/or padding the final output image to the correct resolution and aspect ratio as well as leaving the necessary margins for any text, logos, or other printmarks given the print expansion applied by most borderless photo printers. See the [Process Mediaitems](../setup/mediaprocessing.md) page for more guidance.

## Printer Setup

With the Print button enabled and image processing configured to your liking, the next part of setup is to generate the proper command to send processed files from the photobooth gallery to your printer. In this example, we'll cover the following steps:
    
1. Downloading and installing the appropriate printer driver (in this case, for the DS-RX1HS)
2. Configuring and testing printing outside of photobooth-app
3. Writing and debugging the print command
4. Configuring and testing printing in photobooth-app

### Linux (Ubuntu 24.04 LTS)

The following example may also apply to other Debian or non-Debian based Linux systems.

#### 1. Driver Installation

DNP printers are supported on Linux via the [Gutenprint](https://gimp-print.sourceforge.io/p_Supported_Printers.php) driver package. Begin by installing the `printer-driver-gutenprint` package.
    
    sudo apt install printer-driver-gutenprint

Restart CUPS to make sure the new drivers are ready for use.

    sudo systemctl restart cups

Now, with the printer powered on and connected via USB, you can add it using Settings -> Printers -> Add Printer... or any other preferred method. The DS-RX1HS will be detected and added as the DS-RX1 (since the RX1HS is mainly just a printer firmware upgrade along with redesigned media). When added properly, the printer model should indicate CUPS+Gutenprint as the supporting driver stack.

#### 2. Printer Configuration

After installing and adding the printer, we can now begin configuring the printer's default options to match your preferences and installed print media.

Do this by going to the Printers page in Settings, clicking on the ⋮ menu for the printer, and selecting Printing Options.

You may also go to the CUPS web interface at `http://localhost:631`, click the top tab for Printers, click on the printer name, then click Set Default Options in the second dropdown menu (that says Administration by default).

Important options to set during initial setup include:

1. Media Size (to match your installed print media)
2. Orientation
3. Image Quality (consider the tradeoff between resolution and print time)
4. Advanced options such as Color Precision, Shrink Page If Necessary to Fit Borders, Overcoat Pattern, etc.

Once you've configured the printer defaults, you may print a test page by clicking Test Page on the printer options screen or in the CUPS web interface using the first dropdown menu (that says Maintenance by default). An Ubuntu system test print with CMYK and RGB test patterns should be printed. If this is successful, you can proceed to testing photographic prints using any image preview / editing software such as GIMP and further refine your settings.

#### 3. Writing the Print Command

Once you are happy with your test prints, we can proceed to write an `lp` command to print image files using the settings you prefer. Note that while we'll be explicit with invoking the print options we previously set, it should be that using `lp` without those options added should simply default to the options you setup before.

We start with the core of the `lp` command:

    lp -d PRINTER_NAME {filename}

Options can be added to this command using the pattern `-o OPTION_NAME=OPTION_VALUE`. To know the option names and values accepted by your printer, we can run the following command:

    lpoptions -p PRINTER_NAME -l

You should see a long list of option names and values with * next to the default options you set previously. Based on the list of important options to consider from the previous step, these are the command flags we'll use:

1. `-o PageSize=w288h432` (to print on 4x6 media)
2. `-o orientation-requested=4` (`3` to print portrait, `4` to print landscape)
2. `-o StpColorPrecision=Best`
3. `-o Resolution=300dpi` (`300x600dpi` to print at 600dpi)
4. `-o StpiShrinkOutput=Expand`
5. `-o StpImageType=Photo`
6. `-o StpLaminate=Glossy` (`Matte` to add a matte texture at the cost of longer print time)

Now, we can put this together into a single command to test printing from the commandline:

    lp -d PRINTER_NAME {filename} -o PageSize=w288h432 -o orientation-requested=4 -o StpColorPrecision=Best -o Resolution=300dpi -o StpiShrinkOutput=Expand -o StpImageType=Photo -o StpLaminate=Glossy

Test this print command by passing a file in place of the `{filename}` boilerplate. If it works as expected, then you're ready to set your Print Actions in the photobooth app to use this command.

Note: you can also create and use named *printer instances* that map to a predefined set of configuration options like a preset. For more information see Creating Saved Options in the [CUPS Command-Line Printing and Options](https://www.cups.org/doc/options.html) page.

#### 4. Finish Print Setup in Photobooth

We can now take the command we crafted in the previous step and add it back to the Print Action we configured in the photobooth app. Navigate to your photobooth admin page and go to CONFIGURATION -> share -> (Your Print Action). Paste the command in the Share Command box and save.

Once finished, you should now be able to trigger a print of pictures in your gallery by pressing the Print Action you created. For more advanced use cases, consider creating multiple Print Actions with different settings for quality, finishing, and number of copies.