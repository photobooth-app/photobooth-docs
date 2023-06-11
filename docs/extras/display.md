# Display

## Disable display standby

If the display turns off after some time, disable the screensaver and power save modes.
Edit following file and reboot.

```bash title="/etc/xdg/lxsession/LXDE-pi/autostart"
# remove following line
@xscreensaver -no-splash

# add following lines
@xset s noblank 
@xset s off 
@xset -dpms
```

## Hide mouse curser

For touchscreen displays you might consider to remove the mouse cursor.
Install unclutter for this. After reboot it is enabled automatically.

```bash
sudo apt install unclutter
```
