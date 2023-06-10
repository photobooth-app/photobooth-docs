
# WLED integration

for LED signaling

Add animated lights to your photobooth powered by WLED. WLED is a fast and feature-rich implementation of an ESP8266/ESP32 webserver to control NeoPixel (WS2812B, WS2811, SK6812) LEDs.

Head over to <https://kno.wled.ge/basics/getting-started/> for installation instructions and hardware setup. Connect the ESP board via USB to the photobooth computer.

In the WLED webfrontend define three presets:

- ID 1: standby (usually LEDs off)
- ID 2: countdown (animates countdown)
- ID 3: shoot (imitate a flash)

Please define presets on your own in WLED webfrontend. Once added, in the photobooth enable the WLED integration and provide the serial port. Check logs on startup whether the module is detected correctly.
