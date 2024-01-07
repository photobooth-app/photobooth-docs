# Raspberry Pi GPIO

The photobooth supports Raspberry Pi GPIO to trigger certain events.
Currently supported triggers are:

- Shutdown host, default GPIO 17, hold 2 seconds
- Reboot host, default GPIO 18, hold 2 seconds
- Take a picture, default GPIO 27, press
- Take a collage, default GPIO 22, press
- Take an animation (GIF), default GPIO 24, press
- Print most recent image, default GPIO 23, press

Internally gpiozero python implementation is used.

## Raspberry Pi GPIO wiring

To use the hardware triggers wire a normally open button from GND to the designated GPIO.
For example connect the button to GND and GPIO 17.

![gpio overview](../assets/GPIO-Pinout-Diagram-2.png)
<font size="2">[source](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)</font>

## Configure

In the admin panel tab hardwareinput enable the GPIO feature in general.
Change the default GPIO numbers according to your wiring.
