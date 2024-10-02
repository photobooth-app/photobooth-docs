# Clean shutdown using a UPS

Usually the operating system is required to shutdown in order to avoid data loss and a corrupted OS. Often this is neglected and the power is just cut by removing the power cord from the photobooth.

Following is a recommendation how to implement a UPS. The features of the reference setup are:

- automatic power up when the power cord is connected to the photobooth (auto power on)
- automatic shutdown on unplugging the power cord by power loss detection
- cut power when shutdown finished to turn off the UPS protecting the batteries and save power

## Reference setup

| UPS | Pi supported | Auto power on | Auto shutdown | Cut power | Notes |
| --- | - | ---- | ---- | ---- | -- |
| Geekworm X728 | Pi 3,4,5 | ✅ | ✅ | ✅ | - |

You tested another setup? [Please tell us all the details so we can add the solution here!](https://github.com/photobooth-app/photobooth-app/discussions)

## Software setup

### Geekworm X728

#### Power Management Integration

There is no need to use the custom Geekworm software at all. Just set the following parameters in the OS config.txt.

```ini title="/boot/firmware/config.txt"
[all]
# Settings for Geekworm x728 v2.5
# cut power after shutdown
dtoverlay=gpio-poweroff,gpiopin=26,timeout_ms=6000 # early x728 versions is GPIO 13
# shutdown automatically on power loss detected, wait 3s before shutdown.
dtoverlay=gpio-shutdown,gpio_pin=6,active_low=0,gpio_pull=down,debounce=3000
# report battery status from x728 to the OS
dtoverlay=i2c-sensor,max17040
```

#### Realtime Clock Integration

Useful for all Raspberry Pi's <=4. The Pi 5 has an integrated realtime clock, so it's easy to use. Just put the battery.

```ini title="/boot/firmware/config.txt"
[all]
# Settings for Geekworm x728 v2.5
# hardware clock
# remove fake-hwclock package when enable following line to activate RTC use.
dtoverlay=i2c-rtc,ds1307
```

In current bookworm system this should be all whats needed. Earlier OS versions might need more tweaking, follow the [Geekworm Wiki for more details](https://wiki.geekworm.com/How_to_enable_RTC).
