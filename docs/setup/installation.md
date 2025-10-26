# Installation 🔧

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
    - USB-webcameras via [linuxpy](https://github.com/tiagocoutinho/linuxpy) or [opencv2](https://opencv.org/).

## System Preparation

### RaspberryPi OS

On a fresh Raspberry Pi OS Bookworm/Trixie 64bit system, run following commands:

#### Update System (RPi)

```zsh
sudo apt update
sudo apt upgrade
```

#### Install system dependencies (RPi)

The following dependencies need to be installed for Raspberry Pi OS 64bit.
Customize for debian/ubuntu. Picamera2 is only available for Raspberry Pi.

```zsh
sudo apt -y install ffmpeg libturbojpeg0 libgl1 libgphoto2-dev fonts-noto-color-emoji
sudo apt -y install libexif12 libgphoto2-6 libgphoto2-port12 libltdl7
sudo apt -y install python3-dev
```

#### Tweak system settings (RPi)

##### Touchscreen input issues

Depending on which display server (X, Wayland) and input (labwc) is used, you might run into touch screen issues.
If scrolling doesn't work, consider to [switch back to multitouch instead mouse emulation](https://github.com/photobooth-app/photobooth-app/issues/559).

##### WiFi issues

By default, the Pi OS has a power-save mode enabled for the WiFi adapter. This causes the WiFi do disconnect after some time and leads to unreliable connectivity.
It's recommended to disable the power-save mode. Add the following line to `/etc/rc.local` right before the `exit` line:

```sh title="/etc/rc.local"
iw dev wlan0 set power_save off
```

Afterwards confirm the power management is `off` by checking the output of `iwconfig` in the terminal for the wifi adapter.

### Debian/Ubuntu

There is no dedicated installation guide yet.
It should work similar to a Raspberry Pi installation, so please try this one.
Feel free to submit a pull request to improve the instructions.

### Windows

Windows is supported. Install Pathon including the development headers (tick the box during the installation).
Digicamcontrol is integrated to support DSLR cameras on Windows platform. The Digicamcontrol is not maintained any more,
so if the software fails to work in the future, the backend is removed from the app. Until then you can use it to use it, but it will not receive new features.

#### Tweak system settings (Win)

- Ensure the system has standby disabled and the monitor is not turned off.
- Consider using [autologin to windows desktop](https://learn.microsoft.com/de-de/sysinternals/downloads/autologon).

#### Install system dependencies (Win)

To use the photobooth first install following system dependencies:

- [Latest stable Python](https://www.python.org/downloads/) Please use the link, the Microsoft Store version is not recommended.
- [Latest ffmpeg-release](https://ffmpeg.org/download.html): Choose the windows releases from gyan.dev. Look for the release builds, for example `ffmpeg-release-full.7z`. Download the folder, unpack it to C:\ and add the path to the executable ffmpeg.exe to system path's. Check that in a CLI you can start ffmpeg. If it starts, photobooth can use it also. If you don't need the video feature, you don't need to install ffmpeg.

!!! note
Since v5 the [latest libjpeg-turbo-X.X.X-**vc64**](https://github.com/libjpeg-turbo/libjpeg-turbo/releases) is optional. Using libjpeg-turbo is better for the performance, but on modern computers the difference is neglible. On Raspberry Pi or other SBC using libjpeg-turbo is recommended.
If you install v4 or older, libjpeg-turbo is mandatory. Ensure to use the -vc64 variant and unpack it to C:\ so it will be automatically detected.

## Install photobooth app

There are several ways to install:

1. Method A: Install using pipx (easiest, recommended for Bookworm/Trixie)
2. Method B: Install using venv
3. Method C: Install globally (recommended for Windows)

It's now preferred to install pypi packages in virtual environments. The latest Linux operating systems are starting to implement [externally managed base environments](https://peps.python.org/pep-0668/). The easiest way to install it is to use pipx.

### Method A: Install using pipx

Use the following commands to install pipx in a virtual environment:
Install pipx from repo - if not available, check the pipx website

```zsh
sudo apt -y install pipx
```

Use the following command to ensure that the path is registered and the application is available globally. You may also need to restart the console or logout/login to re-read the environment paths variable.

```zsh
pipx ensurepath
```

Run the photobooth installation. Allow the import of system-site packages, as picamera2 is installed globally via apt in system-site.

```zsh
pipx install --system-site-packages photobooth-app --pip-args='--prefer-binary'
```

### Method B: Install using venv

To install in a virtual environment, use the following commands:

Create an empty directory and change to the new directory:

```zsh
mkdir ~/photobooth-app && cd ~/photobooth-app
```

Initialize a new venv named myenv. Allow the import of system-site-packages, since picamera2 is installed globally via apt in system-site:

```zsh
python -m venv --system-site-packages myenv
```

Activate the newly created environment:

```zsh
source myenv/bin/activate
```

Install the photobooth-app

```zsh
python -m pip install --prefer-binary photobooth-app
```

Note: `--prefer-binary` is added to avoid compiling opencv and instead prefer the wheel, which installs in minutes instead of hours.

### Method C: Install globally

This was the default method in the past. Install the photobooth application:

```zsh
pip install --prefer-binary photobooth-app
```

## First start

### Create data folder

The photobooth application automatically uses the current folder as the data folder.
All images, logs, and configuration files are stored in this folder.

```zsh
mkdir ~/photobooth-data
```

Start the app

```zsh
cd ~/photobooth-data
```

Do the following only if you installed using the venv method

```zsh
source ~/photobooth-app/myenv/bin/activate
```

Launch the application. The current directory will be used as the working directory. If you start the application again later, make sure you start it from the same directory.

```zsh
photobooth
```

Browse to <http://localhost:8000> and see if the application works properly.
By default, the application uses a generated image and streams a demonstration video. No camera is started at this time.
You will need to [continue setting up the cameras](./configuration//camera_setup.md).

!!! info
Having trouble accessing the website or seeing error messages during installation and application launch? Check the [troubleshooting guide](../help/troubleshooting.md).

## Setup the Raspberry Pi in Kiosk Mode

To set up the kiosk mode, you will need to install the Photobooth application as a service and set up the browser to start automatically at boot time.
The following advice is intended as a general guide, but since the OS changes from time to time, the guide may be outdated.

### Service Setup

#### Automatic Service Setup

Once the Photobooth application has been launched, the service can be installed automatically on Linux systems.
Select Admin Center -> Dashboard -> Server Control -> Install Service.
After confirmation the service will be installed as described below for manual setup.
If the setup fails, please install the service manually.

#### Manual Service Setup

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

```zsh
systemctl --user daemon-reload
systemctl --user enable photobooth-app.service
```

#### Start/Stop the Service

Independent if automatic or manual installation of the service, the app can be started using the service as follows.

```zsh
systemctl --user start photobooth-app.service
```

If you want to check the service started properly, invoke systemctl with the `status` parameter:

```zsh
systemctl --user status photobooth-app.service
```

!!! info
The app does not start?
It could be helpful to stop the service and start the app manually.
Check the [troubleshooting guide](../help/troubleshooting.md#manually-start-the-app).

### Desktop shortcut and autostart (Debian Trixie)

#### Desktop Icon (Trixie)

Create the following file in the specified location:

```ini title="~/Desktop/photobooth-app.desktop" hl_lines="6"
[Desktop Entry]
Terminal=false
Type=Application
Name=Photobooth-App
# for older Debian systems, the browser is "chromium-browser", since Trixie it's "chromium"
Exec=chromium --kiosk --disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
StartupNotify=false
```

#### Autostart on system startup (Trixie)

To autostart the app, chromium needs to start automatically after boot.
The latest Raspberry Pi OS has several window manager - the most recent is labwc. Prior wayland was used, both are described below.

Create the file below as indicated. The file autostart may not exist yet, so you need to create it.

```bash title="~/.config/labwc/autostart" hl_lines="1"
until curl -s http://localhost:8000 >/dev/null; do sleep 1; done; chromium --kiosk --password-store=basic --disable-pinch --disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
```

### Desktop shortcut and autostart (Debian Bookworm)

#### Desktop Icon (Bookworm)

Create the following file in the specified location:

```ini title="~/Desktop/photobooth-app.desktop" hl_lines="6"
[Desktop Entry]
Terminal=false
Type=Application
Name=Photobooth-App
Exec=chromium-browser --kiosk --disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
StartupNotify=false
```

#### Autostart on system startup (Bookworm)

To autostart the app, chromium needs to start automatically after boot.
The latest Raspberry Pi OS has several window manager - the most recent is labwc. Prior wayland was used, both are described below.

##### Labwc

Create the file below as indicated. The folder labwc and the file autostart may not exist yet, so you need to create these.

```bash title="~/.config/labwc/autostart" hl_lines="1"
until curl -s http://localhost:8000 >/dev/null; do sleep 1; done; chromium-browser --kiosk --disable-pinch --disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
```

##### Wayland

Modify the file below as indicated. If there is already a section `[autostart]`, just add the line `chromium = ...` otherwise add the whole section.

```bash title="~/.config/wayfire.ini" hl_lines="2"
[autostart]
chromium = until curl -s http://localhost:8000 >/dev/null; do sleep 1; done; chromium-browser --kiosk --disable-pinch --disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
```
