---
outline: [2, 3]
---

# Installation 🔧

[![current release](https://img.shields.io/pypi/v/photobooth-app)](https://pypi.org/project/photobooth-app/)

The application is available as a [PyPI package](https://pypi.org/project/photobooth-app/). Follow this guide to install.

Still need a box? [Check out the 3d printed photobooth box!](https://github.com/photobooth-app/photobooth-3d)

Let's go...

## Prerequisites

- [Python](https://www.python.org/) 3.10 or later.
- System: Raspberry Pi 4 or 5 recommended with latest 64bit OS. Also, more performant hardware is fine using a generic Debian/Windows. Raspberry Pi 3 could work but might be slow.
- Screen: A touchscreen is highly recommended. Recommended minimum resolution is 1024x600.
- Camera. You can use one or two cameras. Using two cameras allows to dedicate one camera to stills and one to livepreview/videos. Supported cameras:
    - DSLR via [gphoto2](http://www.gphoto.org/proj/libgphoto2/support.php) on Linux
    - Raspberry Pi [camera modules](https://www.raspberrypi.com/documentation/accessories/camera.html) via [picamera2](https://github.com/raspberrypi/picamera2).
    - USB-webcameras via [linuxpy](https://github.com/tiagocoutinho/linuxpy) or PyAV/ffmpeg.

## Raspberry Pi OS Trixie

### System Preparation

On a fresh 64-bit Raspberry Pi OS Trixie system, run following commands:

#### Update System

```sh
sudo apt update
sudo apt upgrade
```

#### Install system dependencies

The following dependencies need to be installed for Raspberry Pi OS 64bit.
Customize for debian/ubuntu. Picamera2 is only available for Raspberry Pi.

```sh
sudo apt -y install ffmpeg libturbojpeg0 libgl1 libgphoto2-dev fonts-noto-color-emoji
sudo apt -y install libexif12 libgphoto2-6t64 libgphoto2-port12t64 libltdl7
sudo apt -y install python3-dev
```

#### Tweak system settings

##### Touchscreen

Depending on which display server (X, Wayland) and input (labwc) is used, you might run into touch screen issues.
If scrolling doesn't work, consider to [switch back to multitouch instead mouse emulation](https://github.com/photobooth-app/photobooth-app/issues/559).

##### WiFi

By default, the Pi OS has a power-save mode enabled for the WiFi adapter. This causes the WiFi do disconnect after some time and leads to unreliable connectivity.
It's recommended to disable the power-save mode. Add the following line to `/etc/rc.local` right before the `exit` line:

```sh title="/etc/rc.local"
iw dev wlan0 set power_save off
```

Afterwards confirm the power management is `off` by checking the output of `iwconfig` in the terminal for the wifi adapter.

### Install using pipx

It's preferred to install pypi packages in virtual environments. The latest Linux operating systems are starting to implement [externally managed base environments](https://peps.python.org/pep-0668/). The easiest way to install it is to use pipx.

Use the following commands to install pipx in a virtual environment.

```sh
sudo apt -y install pipx
pipx ensurepath
```

Now check if you can run pipx. If not, you may need to logout/login or reboot.

```sh
pipx
```

Run the photobooth installation. Allow the import of system-site packages, as picamera2 is installed globally via apt in system-site.

```sh
pipx install --system-site-packages photobooth-app --pip-args='--prefer-binary'
```

### First start

#### Create data folder

The photobooth application automatically uses the current folder as the data folder.
All images, logs, and configuration files are stored in this folder.

```sh
mkdir ~/photobooth-data && cd ~/photobooth-data
```

#### Start the app

Launch the application. The current directory will be used as the working directory. If you start the application again later, make sure you start it from the same directory.

```sh
photobooth
```

Browse to <http://localhost:8000> and see if the application works properly.
By default, the application uses a generated image and streams a demonstration video. No camera is started at this time.
You will need to [continue setting up the cameras](./configuration/camera_setup.md).

::: info
Having trouble accessing the website or seeing error messages during installation and application launch? Check the [troubleshooting guide](../help/troubleshooting.md).
:::

### Setup Kiosk Mode

To set up the kiosk mode, you will need to install the Photobooth application as a service and set up the browser to start automatically at boot time.
The following advice is intended as a general guide, but since the OS changes from time to time, the guide may be outdated.

#### Service Setup

##### Automatic Service Setup

Once the Photobooth application has been launched, the service can be installed automatically on Linux systems.
Select Admin Center -> Dashboard -> Server Control -> Install Service.
After confirmation the service will be installed as described below for manual setup.
If the setup fails, please install the service manually.

##### Manual Service Setup

Now that you have made sure that the photobooth application is working properly, it's time to set up the application as a service.
If you installed the application according to the instructions above, the template .service file will work for you.

Create the following file in the specified location:

```ini title="~/.local/share/systemd/user/photobooth-app.service" hl_lines="8 9"
[Unit]
Description=photobooth-app
After=default.target

[Service]
Type=simple
Restart=always
#you might want to adjust following lines
WorkingDirectory=%h/photobooth-data/
ExecStart=python -O -m photobooth

[Install]
WantedBy=default.target
```

Now reload systemctl and enable the service:

```sh
systemctl --user daemon-reload
systemctl --user enable photobooth-app.service
```

##### Start/Stop the Service

Independent if automatic or manual installation of the service, the app can be started using the service as follows.

```sh
systemctl --user start photobooth-app.service
```

If you want to check the service started properly, invoke systemctl with the `status` parameter:

```sh
systemctl --user status photobooth-app.service
```

::: info

The app does not start?
It could be helpful to stop the service and start the app manually.
Check the [troubleshooting guide](/help/troubleshooting.md#manually-start-the-app).
:::

#### Desktop shortcut and autostart

##### Disable Chromium translation

To prevent Chromium's translation popup from appearing in kiosk mode, create a managed policy:

```sh
sudo install -d -m 0755 /etc/chromium/policies/managed
echo '{"TranslateEnabled": false}' | sudo tee /etc/chromium/policies/managed/photobooth-translate.json > /dev/null
sudo chmod 644 /etc/chromium/policies/managed/photobooth-translate.json
```

This disables Chromium translation for all users of the browser, not the application's language selection. Restart Chromium and check `chrome://policy` to confirm that `TranslateEnabled` is set to `false`.

##### Desktop Icon

Create the following file in the specified location:

```ini title="~/Desktop/photobooth-app.desktop" hl_lines="5"
[Desktop Entry]
Terminal=false
Type=Application
Name=Photobooth-App
Exec=chromium --kiosk --password-store=basic --disable-pinch --disable-features=OverscrollHistoryNavigation --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
StartupNotify=false
```

##### Autostart on system startup

To start the app automatically after boot on Raspberry Pi OS Trixie, configure Chromium in the labwc autostart file.

Create the file below if it does not exist yet:

```bash title="~/.config/labwc/autostart" hl_lines="1"
until curl -s http://localhost:8000 >/dev/null; do sleep 1; done; chromium --kiosk --password-store=basic --disable-pinch --disable-features=OverscrollHistoryNavigation --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
```

## Other Debian/Ubuntu Systems

There is no dedicated installation guide.
It should work similar to a Raspberry Pi installation, so please use the Pi installation method as reference.

## Windows

Install Python including the development headers (tick the box during the installation).

::: note
Digicamcontrol is integrated to support DSLR cameras on Windows platform. The Digicamcontrol is not maintained any more,
so if the software fails to work in the future, the backend is removed from the app. Until then you can use it to use it, but it will not receive new features.

Of course, you can use Webcams on Windows any time.
:::

### System Preparation

- Ensure the system has standby disabled and the monitor is not turned off.
- Consider using [autologin to windows desktop](https://learn.microsoft.com/de-de/sysinternals/downloads/autologon).

#### Install system dependencies

To use the photobooth first install following system dependencies:

- [Latest stable Python](https://www.python.org/downloads/) Please use the link, the Microsoft Store version is not recommended.
- That's it ✔️

### Install using pip

On Windows, using a global installation is most conventient. The global installation is described below. Of course, you can install the app using pipx or venvs on Windows also.

```sh
pip install --prefer-binary photobooth-app
```

### First start

#### Create data folder

The photobooth application automatically uses the current folder as the data folder.
All images, logs, and configuration files are stored in this folder.

```sh
mkdir ~/photobooth-data && cd ~/photobooth-data
```

#### Start the app

Launch the application. The current directory will be used as the working directory. If you start the application again later, make sure you start it from the same directory.

```sh
photobooth
```

Browse to <http://localhost:8000> and see if the application works properly.
By default, the application uses a generated image and streams a demonstration video. No camera is started at this time.
You will need to [continue setting up the cameras](./configuration/camera_setup.md).

::: info
Having trouble accessing the website or seeing error messages during installation and application launch? Check the [troubleshooting guide](../help/troubleshooting.md).
:::

### Setup Kiosk Mode

There is no dedicated description to setup a kiosk mode on, yet.
