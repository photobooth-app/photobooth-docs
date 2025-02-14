
# LED ringlight to signal countdown

Add animated lights to your photobooth powered by [WLED](https://kno.wled.ge/). WLED is a fast and feature-rich implementation of an ESP8266/ESP32 webserver to control NeoPixel (WS2812B, WS2811, SK6812) LEDs.

WLED integration for LED signaling, see yourself:

<video controls>
<source src="../../assets/wled/takepicture.mp4" type="video/mp4">
</video>

## Hardware

### BOM

- ESP board, for example Wemos D1 mini.
- 3d printed [mount for wemos d1 mini](https://www.printables.com/de/model/205206-wemos-d1-mini-mount/files)
- ring light for 3d printed photobooth or whatever led stripe you want
- some cables

### Wiring

The ring light needs 5V, GND and a signal line to control the colors.

!!! info "Use IO not connected internally"
    On the [D1 mini board](https://www.wemos.cc/en/latest/d1/d1_mini_lite.html#pin), the GPIO2 labelled D4 is closest to 5V/GND so it would be convenient to use. But it is connected to a builtin led. Since the LED is not needed, and might shine through the 3d printed case, it is recommended to use a different IO.

![wiring overview](../assets/wled/overview.jpg)

## Setup WLED

!!! info "WLED documentation"
    Head over to the [WLED project documentation](https://kno.wled.ge/basics/getting-started/) for more detailed installation instructions and hardware setup.

In short, follow these steps

- Connect the ESP board via USB to the computer running the photobooth-app.
- Install WLED using the [webinstaller](https://install.wled.me/)
- Connect the WLED device to your WiFi. The webinstaller asks for the credentials and configures the ESP accordingly.
- Visit the WLED website on the ESP and configure.
- If you use exact the same items listed in the BOM, you can start using following
    - [config](../assets/wled/wled_cfg.json) (using GPIO4 labelled D2)
    - [presets](../assets/wled/wled_presets.json)
- In the photobooth-app [enable the WLED plugin](../reference/plugins.md) and add the serial port to the ESP device in the admin config.

For more detailed instructions on the WLED device itself see the [WLED](https://kno.wled.ge/basics/getting-started/) website see

## Define your own presets

When the photobooth-app starts a countdown, takes a picture or captures a video, it will send commands via serial interface to the WLED module. The presets are identified by the IDs as follows:

- ID 1: standby (usually LEDs off)
- ID 2: countdown (animates countdown)
- ID 3: shoot (imitate a flash)
- ID 4: recording (imitate a red light to visualize ongoing record)

Define the presets on your own in WLED webfrontend or use the presets/config from above. Once added, in the photobooth-app enable the WLED integration and file the serial port of the WLED module in the photobooth-app's config. Check the logs on startup whether the module is detected correctly.
