# Extras

## WLED integration for LED signaling

Add animated lights to your photobooth powered by WLED. WLED is a fast and feature-rich implementation of an ESP8266/ESP32 webserver to control NeoPixel (WS2812B, WS2811, SK6812) LEDs.

Head over to <https://kno.wled.ge/basics/getting-started/> for installation instructions and hardware setup. Connect the ESP board via USB to the photobooth computer.

In the WLED webfrontend define three presets:

- ID 1: standby (usually LEDs off)
- ID 2: countdown (animates countdown)
- ID 3: shoot (imitate a flash)

Please define presets on your own in WLED webfrontend. Once added, in the photobooth enable the WLED integration and provide the serial port. Check logs on startup whether the module is detected correctly.

## Sync Online (for file downloads via QR Code)

```bash
sudo apt-get install rclone inotify-tools
```

```bash
rclone config
```

Setup the remote named "boothupload"!

```bash
chmod u+x ~/photobooth-app/boothupload.sh
cp ~/photobooth-app/boothupload.service ~/.config/systemd/user/
systemctl --user enable boothupload.service
systemctl --user start boothupload
systemctl --user status boothupload
```

## Setup Wifi and Hotspot

At home prefer local wifi with endless data. If this is not available connect to a mobile hotspot for online sync.

In file /etc/wpa_supplicant/wpa_supplicant.conf set a priority for local and hotspot wifi:

```text
network={
    ssid="homewifi"
    psk="passwordOfhomewifi"
    priority=10
}
network={
   ssid="mobileexpensivewifi"
   psk="passwordOfmobileexpensivewifi"
   priority=5
}
```
