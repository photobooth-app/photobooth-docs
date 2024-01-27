# Installation 🔧

The app is available as [PyPI package](https://pypi.org/project/photobooth-app/). Follow this guide to install.

You have seen the 3d printable photobooth box? [Check out the photobooth box!](https://github.com/photobooth-app/photobooth-3d)

## Prerequisites

- Python 3.9 or later.
- System: Raspberry Pi 4 or 5 recommended. Hardware more performant is fine also using a generic Debian/Windows. Raspberry Pi 3 could work also but might be slow.
- Screen: Touchscreen highly recommended. Minimum resolution is 1024x600.
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

| Hardware-Platform  | Software-Platform              | Cameras  |
|--------------------|--------------------------------|--------------------------------------------------------------|
| Raspberry Pi 5 | Raspberry Pi OS (64-bit, Bookworm) | [original camera module](https://www.raspberrypi.com/documentation/accessories/camera.html) |
| Raspberry Pi 4 | Raspberry Pi OS (64-bit, Bookworm) | [original camera module](https://www.raspberrypi.com/documentation/accessories/camera.html) |
| Raspberry Pi 4 | Raspberry Pi OS (64-bit, Bullseye legacy)  | [Arducam IMX519 PDAF](https://docs.arducam.com/Raspberry-Pi-Camera/Native-camera/16MP-IMX519/) |
| Raspberry Pi 4 | Raspberry Pi OS (64-bit, Bookworm) | [Canon 1100D](http://www.gphoto.org/proj/libgphoto2/support.php) |
| Raspberry Pi 4 | Raspberry Pi OS (64-bit, Bookworm) | [Canon 600D](http://www.gphoto.org/proj/libgphoto2/support.php), [try different modes](https://github.com/photobooth-app/photobooth-app/discussions/161) |
| Raspberry Pi 3 | Raspberry Pi OS (64-bit, Bookworm) | Will work, can be slow, not preferred. |

If you have tested additional software/hardware-platform, please let me know and I add it to the list.

## System Preparation

### RaspberryPi OS

On a fresh Raspberry Pi OS 64bit, run following commands:

#### Update System (RPi)

```zsh
sudo apt update
sudo apt upgrade
```

#### Tweak system settings (RPi)

To use hardware input from keyboard or presenter, the current user needs to be added to tty and input group.

```zsh
sudo usermod --append --groups tty,input $(whoami)
```

You also might want to [check some display settings](../extras/display.md).

#### Install system dependencies (RPi)

Following dependencies to be installed for Raspberry Pi OS 64bit.
Adjust for debian/ubuntu. Picamera2 is only available on Raspberry Pi.

```zsh
sudo apt -y install libturbojpeg0 python3-pip libgl1 libgphoto2-dev fonts-noto-color-emoji rclone inotify-tools
```

### Debian/Ubuntu

There are no dedicated installation instructions available by now.
It should work similar to Raspberry Pi installation, please try these. Feel free to send a pull request to improve the instructions.

### Windows

Windows is well supported, the software is developed on a Windows system.
As of app version 1.0 Digicamcontrol is integrated to support DSLR on Windows platform.

#### Update System (Win)

Please ensure Windows is up to date.

#### Tweak system settings (Win)

- Ensure the system has standby disabled and the monitor is not turned off.
- Consider using [autologin to windows desktop](https://learn.microsoft.com/de-de/sysinternals/downloads/autologon).

#### Install system dependencies (Win)

To use the photobooth first install following system dependencies:

- [Latest stable Python](https://www.python.org/downloads/) Please use the link, the Microsoft Store version is not recommended.
- [Latest libjpeg-turbo-X.X.X-**vc64**](https://github.com/libjpeg-turbo/libjpeg-turbo/releases) (ensure to use the -vc64 variant!)

Once the dependencies are installed, continue with the installation of the app. On the Windows platform [Method C is recommended](#method-c-install-globally) currently.

## Install photobooth app

Several ways to install:

1. Method A: Install using pipx (easiest, recommended for Bookworm)
2. Method B: Install using venv
3. Method C: Install globally (recommended for Bullseye and Windows)

It's preferred nowadays to install pypi packages in virtual environments. Latest Linux OS' start implementing [externally managed base environments](https://peps.python.org/pep-0668/) now. The easiest solution to install is using pipx.

### Method A: Install using pipx

Use the following commands to install with pipx in an virtual environment:
Install pipx from repo - if not avail check pipx website

```zsh
sudo apt -y install pipx
```

Following command to ensure path is registered and app globally available. Might need to restart console or logout/login gain also to reread environment paths variable.

```zsh
pipx ensurepath
```

Start photobooth pipx installation. Allow import of system-site-packages as picamera2 is globally installed via apt in system-site.

```zsh
pipx install --system-site-packages photobooth-app --pip-args='--prefer-binary'
```

### Method B: Install using venv

Use the following commands to install in a virtual environment:

Create empty directory & change to new dir:

```zsh
mkdir ~/photobooth-app && cd ~/photobooth-app
```

Initialize a new venv called myenv. Allow import of system-site-packages as picamera2 is globally installed via apt in system-site:

```zsh
python -m venv --system-site-packages myenv
```

Activate the newly created env

```zsh
source myenv/bin/activate
```

Install photobooth-app

```zsh
python -m pip install --prefer-binary photobooth-app
```

Note: `--prefer-binary` is added to avoid compiling opencv and instead prefer the wheel which installs within minutes instead hours.

### Method C: Install globally

This method was default in the past. Install photobooth-app

```zsh
pip install --prefer-binary photobooth-app
```

## First start

### Create data folder

The photobooth-app automatically uses the current folder as data folder.
All images, logs and config files will be stored in this folder.

```zsh
mkdir ~/photobooth-data
```

Start the app

```zsh
cd ~/photobooth-data
```

Following only if installed via venv method

```zsh
source ~/photobooth-app/myenv/bin/activate
```

Start app. Current dir will be used as working-directory!

```zsh
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
Exec=chromium-browser --kiosk --disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/
StartupNotify=false
```

#### Autostart on system startup (Bookworm)

Modify the file below as stated. If there is a section ``[autostart]`` already, just add the line `chromium = ...` otherwise insert the complete section.

```ini title="~/.config/wayfire.ini" hl_lines="2"
[autostart]
chromium = chromium-browser --kiosk--disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized http://localhost:8000/ 
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
Exec=chromium-browser --kiosk--disable-features=Translate --noerrdialogs --disable-infobars --no-first-run --check-for-update-interval=31536000 --touch-events=enabled --password-store=basic http://localhost:8000/ 
StartupNotify=false
```

#### Autostart on system startup (Bullseye)

Create the same file as for desktop shortcut above and place it in
`/etc/xdg/autostart/photobooth-app.desktop`.
After reboot chromium will start automatically.
