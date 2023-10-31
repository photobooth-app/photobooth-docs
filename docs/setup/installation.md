# Installation 🔧

The app is available as [PyPI package](https://pypi.org/project/photobooth-app/). Follow this guide to install.

You have seen the 3d printable photobooth box? [Check out the photobooth box!](https://github.com/photobooth-app/photobooth-3d)

## Prerequisites

- Python 3.9 or later. Python 3.12 is not yet supported.
- If Raspberry Pi: **64bit** system, Bullseye and Bookworm are supported.
- Camera, can be one or two (first camera for stills, second camera for live view)
    - DSLR: [gphoto2](http://www.gphoto.org/proj/libgphoto2/support.php) on Linux
    - RPI [Camera Modules](https://www.raspberrypi.com/documentation/accessories/camera.html) / Arducams: installed and working (test with `libcamera-hello`)
    - Webcamera: no additional prerequisites, ensure camera is working using native system apps

### Reference Systems

The photobooth-app is written in python and itself platform independent.
Nevertheless, depending on the camera backend or peripheral hardware the hardware-platform to use can be restricted to a specific one like a Raspberry Pi.

These are systems used productive or in automated testing and most likely to work without issues.
Gphoto2 and the webcam backends support many different camera models but manufacturers might implement communication protocols slightly different.
If you run into issues, create an issue or open a discussion. Also check the camera manufacturers manuals for their camera installation guides.

| Hardware-Platform  | Software-Platform          | Distribution   | Cameras  |
|--------------------|---------------------------|-----|--------------------------------------------------------------|
| Raspberry Pi 5 | Raspberry Pi OS (64-bit) | Bookworm | No hardware to test yet! |
| Raspberry Pi 3/4 | Raspberry Pi OS (64-bit) | Bookworm | [original camera module](https://www.raspberrypi.com/documentation/accessories/camera.html) |
| Raspberry Pi 3/4 | Raspberry Pi OS (Legacy, 64-bit) | Bullseye | [original camera module](https://www.raspberrypi.com/documentation/accessories/camera.html) |
| Raspberry Pi 3/4 | Raspberry Pi OS (64-bit) | Bookworm | [Canon 1100D](http://www.gphoto.org/proj/libgphoto2/support.php) |
| Raspberry Pi 3/4 | Raspberry Pi OS (Legacy, 64-bit) | Bullseye | [Arducam IMX519 PDAF](https://docs.arducam.com/Raspberry-Pi-Camera/Native-camera/16MP-IMX519/) |

If you have tested additional software/hardware-platform, please let me know and I add it to the list.

## System Preparation

### RaspberryPi OS

On a fresh Raspberry Pi OS 64bit, run following commands:

#### Update System

```zsh
sudo apt-get update
sudo apt-get upgrade
```

#### Install system dependencies

Following dependencies to be installed for Raspberry Pi OS 64bit.
Adjust for debian/ubuntu. Picamera2 is only available on Raspberry Pi.

```zsh
# basic stuff
sudo apt-get -y install libturbojpeg0 python3-pip libgl1 libgphoto2-dev fonts-noto-color-emoji rclone inotify-tools
```

#### Tweak system settings

To use hardware input from keyboard or presenter, the current user needs to be added to tty and input group.

```zsh
sudo usermod --append --groups tty,input $(whoami)
```

You also might want to [check some display settings](../extras/display.md).

### Debian/Ubuntu

There are no dedicated installation instructions available by now.
It should work similar to Raspberry Pi installation, please try these. Feel free to send a pull request to improve the instructions.

### Windows

While using the app on windows works, there is no documentation yet.
Also use is limited by now, because the digicamcontrol software is not yet implemented.
Only webcams can be used on windows right now.

## Install photobooth app

Several ways to install:

1. Method A: Install using pipx (easiest, recommended for Bookworm)
2. Method B: Install using venv
3. Method C: Install globally (recommended for Bullseye)

It's preferred nowadays to install pypi packages in virtual environments. Latest Linux OS' start implementing [externally managed base environments](https://peps.python.org/pep-0668/) now. The easiest solution to install is using pipx.

### Method A: Install using pipx

Use the following commands to install with pipx in an virtual environment:

```zsh
# install pipx from repo - if not avail check pipx website
sudo apt-get -y install pipx
# ensure path is registered and app globally available
pipx ensurepath
# initialize a pipx installation
# allow import of system-site-packages as picamera2 is globally installed via apt in system-site
pipx install --system-site-packages photobooth-app --pip-args='--prefer-binary'
```

### Method B: Install using venv

Use the following commands to install in a virtual environment:

```zsh
# create empty directory
mkdir ~/photobooth-app
# change to new directory
cd ~/photobooth-app
# initialize a new venv called myenv
# allow import of system-site-packages as picamera2 is globally installed via apt in system-site
python -m venv --system-site-packages myenv
# activate the newly created env
source myenv/bin/activate
# install photobooth-app
python -m pip install --prefer-binary photobooth-app
```

Note: `--prefer-binary` is added to avoid compiling opencv and instead prefer the wheel which installs within minutes instead hours.

### Method C: Install globally

This method was default in the past.

```zsh
# install photobooth-app
pip install --prefer-binary photobooth-app
```

## First start

### Create data folder

The photobooth-app automatically uses the current folder as data folder.
All images, logs and config files will be stored in this folder.

```zsh
mkdir ~/photobooth-data
```

### Start the app

```zsh
cd ~/photobooth-data

# following only if installed via venv method
source ~/photobooth-app/myenv/bin/activate

# start app. Current dir will be used as working-directory!
photobooth
```

Browse to <http://localhost:8000> and see if the app is working properly.
Per default the app uses a generated image and displays a timer only. No camera is started at this point.
You need to [continue setting up the cameras](../setup/camera_setup.md).

!!! info
    Have issues accessing the website or see error messages during installation and app startup? Check the [troubleshooting guide](../support/troubleshooting.md).

## Setup system service

To automatically start the photobooth-app it shall be installed as a service.

### Automatic service setup

Once the photobooth-app was started the service can be installed automatically on Linux systems.
Choose in the Admin Center -> Dashboard -> Server Control -> Install Service.
After confirmation the service is installed as described below for manual setup.
If the setup fails, please install manually.

### Manual service setup

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
#you might want to adjust following lines
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
    The service does not start? Check the [troubleshooting guide](../support/troubleshooting.md).
    Following commands might be helpful:
    ```
    systemctl --user status photobooth-app.service
    ```
    ```
    journalctl --user --unit photobooth-app.service
    ```

## Desktop shortcut and autostart

### Bookworm Platform

#### Desktop Icon (Bookworm)

Create the following file at the given location:

```ini title="~/Desktop/photobooth-app.desktop" hl_lines="6"
[Desktop Entry]
Version=1.3
Terminal=false
Type=Application
Name=Photobooth-App
Exec=chromium-browser--kiosk --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
StartupNotify=false
```

#### Autostart on system startup (Bookworm)

Modify the file below as stated. If there is a section ``[autostart]`` already, just add the line `chromium = ...` otherwise insert the complete section.

```ini title="~/.config/wayfire.ini" hl_lines="2"
[autostart]
chromium = chromium-browser --kiosk --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/ 
```

After reboot chromium will start automatically.

### Bullseye Platform

#### Desktop Icon (Bullseye)

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

#### Autostart on system startup (Bullseye)

Create the same file as for desktop shortcut above and place it in
`/etc/xdg/autostart/photobooth-app.desktop`.
After reboot chromium will start automatically.
