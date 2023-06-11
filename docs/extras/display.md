# Display

## Disable display standby

If the display turns off after some time, disable the power save mode.
Run `sudo raspi-config` and disable "Screen Blanking".

## Hide mouse curser

For touchscreen displays you might consider to remove the mouse cursor.
Install unclutter for this. After reboot it is enabled automatically.

```bash
sudo apt install unclutter
```
