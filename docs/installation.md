
# Installation 🔧

## Supported Platforms and Cameras

| Hardware-Platform  | Software-Platform              | Supported Cameras                                                                                                                                                                     |
|--------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Raspberry Pi 3 / 4 | Raspberry Pi OS 64bit Bullseye | [Camera Modules](https://www.raspberrypi.com/documentation/accessories/camera.html), [gphoto2 DSLR](http://www.gphoto.org/proj/libgphoto2/support.php) and webcams via opencv or v4l2 |
| Generic PC         | Debian/Ubuntu                  | [gphoto2 DSLR](http://www.gphoto.org/proj/libgphoto2/support.php) and webcams via opencv or v4l2                                                                                      |
| Generic PC         | Windows                        | webcams via opencv                                                                      |

## Reference Systems

These are systems used productive or in automated testing and guaranteed to work without issues.
Gphoto2 and the webcam backends support many different camera models but manufacturers might implement communication protocols slightly different.
If you run into issues, create an issue or open a discussion.

| Hardware-Platform  | Software-Platform              |Cameras  |
|--------------------|--------------------------------|--------------------------------------------------------------|
| Raspberry Pi 4 | Raspberry Pi OS 64bit Bullseye | [Camera Module v3](https://www.raspberrypi.com/documentation/accessories/camera.html)
| Raspberry Pi 4 | Raspberry Pi OS 64bit Bullseye | [Canon 1100D](http://www.gphoto.org/proj/libgphoto2/support.php) |

## Prerequisites

- Python 3.9 or later
- Camera, can be one or two (first camera for stills, second camera for live view)
    - DSLR: [gphoto2](https://github.com/gonzalo/gphoto2-updater) on Linux
    - Picamera2: installed and working (test with `libcamera-hello`)
    - Webcamera: no additional prerequisites, ensure camera is working using native system apps
- Raspberry Pi Bullseye for Picamera2 or any other linux/windows system
- Turbojpeg (via apt on linux, manually install on windows)
- [works probably best with 3d printed photobooth and parts listed in the BOM](https://github.com/mgrl/photobooth-3d)

The photobooth app can be used standalone but is not feature complete yet.
Anyway, it integrates well with the fully blown [photobooth project](https://photoboothproject.github.io/),
see description below how to achieve integration.

## Install on Linux (Debian/Ubuntu/RaspberryPi OS)

The app is available as [PyPI package](https://pypi.org/project/photobooth-app/).
On a fresh Raspberry Pi OS 64bit, run following commands:

### Update System

```zsh
sudo apt-get update
sudo apt-get upgrade
```

### Install system dependencies

Following dependencies to be installed for Raspberry Pi OS 64bit Bullseye.
Adjust for debian/ubuntu. Picamera2 is only available on Raspberry Pi.

```zsh
# basic stuff
sudo apt-get -y install libturbojpeg0 python3-pip libgl1 libgphoto2-dev
# to display some nice icons and emoticons
sudo apt-get -y install fonts-noto-color-emoji
# to sync images online
sudo apt-get -y install rclone inotify-tools
# to use camera modules on rpi
sudo apt-get -y install python3-picamera2
```

### Tweak system settings

To use hardware input from keyboard or presenter, the current user needs to be added to tty and input group.
Replace {USERNAME} by actual username, for example pi.

```zsh
usermod --append --groups tty,input {USERNAME}
```

### Install photobooth app from PyPi

```zsh
pip install photobooth-app
```

### Create data folder

The photobooth-app automatically uses the current folder as data folder.
All images, logs and config files will be stored in this folder.

```zsh
mkdir ~/photobooth-data
cd ~/photobooth-data
```

### Start the app

```zsh
photobooth
```

Browse to <http://localhost:8000> and see if the app is working properly.
Per default the app uses a generated image and displays a timer only. No camera is started at this point.
You need to [continue setting up the cameras](./setup.md).

!!! info
    Have issues accessing the website or see error messages during installation and app startup? Check the [troubleshooting guide](./support/troubleshooting.md).

### Install photobooth service on startup

#### Automatic service setup

Once the photobooth-app was started the service can be installed automatically on Linux systems.
Choose in the Admin Center -> Dashboard -> Server Control -> Install Service.
After confirmation the service is installed as described below for manual setup.
If the setup fails, please install manually.

#### Manual service setup

Now that you ensured, the photobooth app is working properly, it's time to setup the app as a service.
If you installed the app according to above instructions, the template .service file works for you.

Create the following file at the given location:

```ini title="~/.local/share/systemd/user/photobooth-app.service" hl_lines="8 9"
[Unit]
Description=photobooth-app
After=default.target

[Service]
Type=simple
Restart=always
#you might want to adjust following line
WorkingDirectory=%h/photobooth-data/
ExecStart=python -O -m photobooth

[Install]
WantedBy=default.target
```

Now enable the service and start it:

```zsh
systemctl --user daemon-reload
systemctl --user enable photobooth-app.service
systemctl --user start photobooth-app.service
```

!!! info
    The service does not start? Check the [troubleshooting guide](./support/troubleshooting.md).
    Following commands might be helpful:
    ```
    systemctl --user status photobooth-app.service
    ```
    ```
    journalctl --user --unit photobooth-app.service
    ```

### Desktop shortcut to webfrontend

Create the following file at the given location:

```ini title="~/Desktop/photobooth-app.desktop" hl_lines="6"
[Desktop Entry]
Version=1.3
Terminal=false
Type=Application
Name=Photobooth-App
Exec=chromium-browser --kiosk http://localhost:8000/ --noerrdialogs --disable-infobars --no-first-run --check-for-update-interval=31536000 --touch-events=enabled --password-store=basic
StartupNotify=false
```

### Autostart webfrontend on system startup

Create the same file as for desktop shortcut above and place it in
`/etc/xdg/autostart/photobooth-app.desktop`.
After reboot chromium will start automatically.

## Install on Windows

While using the app on windows works, there is no documentation yet.
Also use is limited by now, because the digicamcontrol software is not yet implemented.
Only webcams can be used on windows right now.

## Install development version

Stable releases are published at [PyPI registry](https://pypi.org/project/photobooth-app/) usually.
To test the latest development version install directly from git:

```sh
pip install git+https://github.com/mgrl/photobooth-app.git@dev
```
