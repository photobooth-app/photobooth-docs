
# LED signaling using WS281x

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

![wiring overview](../assets/wled/overview.jpg)

## Setup WLED

- Connect the ESP board via USB to the computer running the photobooth-app.
- Install WLED using the [webinstaller](https://install.wled.me/)
- Connect the WLED device to your WiFi. The webinstaller asks for the credentials and configures the ESP accordingly.
- Visit the WLED website on the ESP and configure.
- If you use exact the same items listed in the BOM, you can start using following
    - [config](../assets/wled/wled_cfg.json)
    - [presets](../assets/wled/wled_presets.json)
- In the photobooth-app enable the WLED integration and add the serial port to the ESP device in the admin config.

For more detailed instructions on the WLED device itself see the [WLED](https://kno.wled.ge/basics/getting-started/) website see

## Links to WLED project

Head over to <https://kno.wled.ge/basics/getting-started/> for more detailed installation instructions and hardware setup.

# Required presets for photobooth to work

In the WLED webfrontend define four presets:

- ID 1: standby (usually LEDs off)
- ID 2: countdown (animates countdown)
- ID 3: shoot (imitate a flash)
- ID 4: recording (imitate a red light to visualize ongoing record)

Please define presets on your own in WLED webfrontend. Once added, in the photobooth enable the WLED integration and provide the serial port to WLED esp device. Check logs on startup whether the module is detected correctly.
