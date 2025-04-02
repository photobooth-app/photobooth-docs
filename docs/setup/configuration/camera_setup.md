
# Camera Setup (Backends)

The photobooth app supports cameras utilizing multiple backends:

| Backend          | Cameras                     | Platforms      |
|------------------|-----------------------------|----------------|
| `picamera2`      | Raspberry Pi Camera Modules | Raspberry Pi   |
| `gphoto2`        | DSLR                        | Linux          |
| `digicamcontrol` (deprecated) | DSLR           | Windows        |
| `pyav`           | USB Webcams                 | Windows, Linux |
| `opencv2` (deprecated)  | USB Webcams          | Windows, Linux |
| `v4l2`           | USB Webcams                 | Linux          |

Multiple backends can be used simultaneously. For example, the first backend is used for high quality still images,
the second backend is used to stream video preview only.

!!! note
    After changing config, the app needs to be restarted manually.

    If you need help setup a specific camera, [start a new discussion on github](https://github.com/photobooth-app/photobooth-app/discussions).

## Picamera2 Backend

Camera modules are supported using picamera2 based on the new libcamera stack. Autofocus camera modules are supported.

The app is tested with devices described in following chapters.

Ensure the camera is working properly using the libcamera stack:

```bash
libcamera-hello
```

If it does properly open the camera, the photobooth app can use it also.
If some errors come up, try to fix the camera setup before start using it actually.
Find [installation instructions](https://www.raspberrypi.com/documentation/accessories/camera.html#installing-a-raspberry-pi-camera) directly at the raspberry pi foundation or the camera manufacturer.

### List resolutions supported by camera module

The photobooth switches between a high resolution camera mode (low fps, high cpu load) and a lower resolution camera mode (higher fps, lower cpu load). Time to find out which resolutions to use! Issue in the terminal following command:

```bash
libcamera-hello --list-cameras
```

The result will look like this:

```hl_lines="6 8"
Available cameras
-----------------
0 : imx519 [4656x3496] (/base/soc/i2c0mux/i2c@1/imx519@1a)
    Modes: 'SRGGB10_CSI2P' : 1280x720 [120.00 fps - (1048, 1042)/2560x1440 crop]
                            1920x1080 [60.05 fps - (408, 674)/3840x2160 crop]
                            2328x1748 [30.00 fps - (0, 0)/4656x3496 crop]
                            3840x2160 [18.00 fps - (408, 672)/3840x2160 crop]
                            4656x3496 [9.00 fps - (0, 0)/4656x3496 crop]
```

The preferred settings derive as follows from the above output:

- Picamera2 Capture Cam Resolution Width = 4656
- Picamera2 Capture Cam Resolution Height = 3496
- Picamera2 Preview Cam Resolution Width = 2328
- Picamera2 Preview Cam Resolution Height = 1748

Why? Capture shall be with highest resolution supported. The whole data is used from sensor, nothing cropped. The lower resolution is chosen to be 2328x1748 because the cropping is the same. The captured scene in both modes is exactly the same, nobody will notice that the camera changed it's mode - except better quality in final images ✨

### Camera Module 3

The latest [Camera Module 3](https://www.raspberrypi.com/products/camera-module-3/) is probably the best camera module to use in the photobooth.
It supports fast autofocus and comes with native driver in the Raspberry Pi OS.

Now finish setup:

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- Set the main backend to Picamera2
- The default resolution is optimized for the camera module 3. In case you changed it, following is ideal:
    - Picamera2 Capture Cam Resolution Width = 4608
    - Picamera2 Capture Cam Resolution Height = 2592
    - Picamera2 Preview Cam Resolution Width = 2304
    - Picamera2 Preview Cam Resolution Height = 1296
- Restart the app

For your reference the output of ``libcamera-hello --list-cameras``:

```title="Raspberry Pi Camera Module 3 (imx708)" hl_lines="4 5"
pi@photobooth:~ $ libcamera-hello --list-cameras
0 : imx708 [4608x2592] (/base/soc/i2c0mux/i2c@1/imx708@1a)
    Modes: 'SRGGB10_CSI2P' : 1536x864 [120.13 fps - (0, 0)/4608x2592 crop]
                             2304x1296 [56.03 fps - (0, 0)/4608x2592 crop]
                             4608x2592 [14.35 fps - (0, 0)/4608x2592 crop]
```

### Camera Modules 1/2/HQ

All other camera modules from the Raspberry Pi ecosystem work the same way as the latest camera module 3.
They usually have a lower image quality and do not have autofocus.
Due to this other camera modules are not recommended for use as main camera.
You might consider to use them only for livestream preview.

Setup is the same as for camera module 3 but with different resolution. See also the chapter above to list resolutions.

### Arducam imx519

Arducam is not actively supported by the app. It could work, but fail any time if the underlying drivers break for example after an system update.

Sony's imx519 sensor used in [Arducam's imx519 camera module](https://www.arducam.com/product/imx519-autofocus-camera-module-for-raspberry-pi-arducam-b0371/) is supported by the
Raspberry Pi OS natively since about March 2023.

This means the module can be used with or without installing Arducams custom driver packages:

- without Arducams driver:
    - ➖No PDAF support
    - ➖Only interval based autofocus e.g. every 10 seconds
    - ➕More stable upgrades because no customized libcamera needs to be installed.
    - [install as described in discussions](https://github.com/photobooth-app/photobooth-app/discussions/23)
- with Arducams driver:
    - ➕PDAF support
    - ➕Continuous autofocus like camera module 3
    - ➖apt upgrade may break driver/libcamera from time to time
    - [install as described by Arducam](https://docs.arducam.com/Raspberry-Pi-Camera/Pivariety-Camera/Quick-Start-Guide/)

Now finish setup:

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- set the main backend to Picamera2
- Enable livepreview if desired
- Change the resolution requested from the camera for stills and preview, see table below.
    - Picamera2 Capture Cam Resolution Width = 4656
    - Picamera2 Capture Cam Resolution Height = 3496
    - Picamera2 Preview Cam Resolution Width = 2328
    - Picamera2 Preview Cam Resolution Height = 1748
- Restart the app

For your reference the output of ``libcamera-hello --list-cameras``:

```title="Arducam 16MP (imx519)" hl_lines="7 9"
pi@photobooth:~ $ libcamera-hello --list-cameras
Available cameras
-----------------
0 : imx519 [4656x3496] (/base/soc/i2c0mux/i2c@1/imx519@1a)
    Modes: 'SRGGB10_CSI2P' : 1280x720 [120.00 fps - (1048, 1042)/2560x1440 crop]
                            1920x1080 [60.05 fps - (408, 674)/3840x2160 crop]
                            2328x1748 [30.00 fps - (0, 0)/4656x3496 crop]
                            3840x2160 [18.00 fps - (408, 672)/3840x2160 crop]
                            4656x3496 [9.00 fps - (0, 0)/4656x3496 crop]
```

### Other third party camera modules

In principle every camera supported by libcamera / picamera2 would work.
Since the cameras do not come with native support of the Raspberry Pi OS using them could be troublesome and it's untested.
[Start a discussion](https://github.com/photobooth-app/photobooth-app/discussions/categories/howtos-and-camera-specific-topics) if there is a camera not working properly.

## Gphoto2 Backend

The app is tested with a Canon 1100D. In general all [gphoto2 supported cameras](http://www.gphoto.org/proj/libgphoto2/support.php) can be used.
If the camera supports liveview a stream is created and being used as preview in the app.
If the camera does not support liveview, you might want to consider to setup the app with two backends so one is for stills, the other one for preview/video.
The main camera would be the DSLR to take high quality images, the livestream is captured from a secondary backend.
As secondary backend most suitable is a webcamera or raspberry pi camera module.

Now finish setup:

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- set the main backend to Gphoto2

DSLR cameras of different manufacturer may behave differently. There are some settings that might need to be adjusted if autofocus is slow or preview cannot be generated.
Tinker with available settings until it works properly. If you run into trouble, [create a new issue in the tracker](https://github.com/photobooth-app/photobooth-app/issues).

!!! note
    Linux systems automatically mount the camera on connection. This interferes with the photobooth, since the app needs exclusive access.
    Check this [guide on how to disable `gvfs-gphoto2-volume-monitor`](https://photobooth-app.org/support/faq/#gphoto2-camera-found-but-no-access)

## Digicamcontrol Backend

!!! info
    This backend is deprecated. Digicamcontrol is not actively maintained since long time. The backend might be removed in the future.

The app is tested with a webcamera in Digicamcontrol. In general all [digicamcontrol supported cameras](https://digicamcontrol.com/cameras) can be used.
If the camera supports liveview a stream is created and being used as preview in the app.
If the camera does not support liveview, you might want to consider to setup the app with two backends so one is for stills, the other one for preview/video.
The main camera would be the DSLR to take high quality images, the livestream is captured from a secondary backend.
As secondary backend most suitable is a webcamera or raspberry pi camera module.

### Setup Photobooth-App

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- set the main backend to Digicamcontrol

### Setup Digicamcontrol

Following Configuration is mandatory. There may be additional settings needed for your specific setup/camera.

- Settings
    - General
        - Main window: Default
        - Minimize to tray icon: ✔️
        - Start minimized: ✔️
        - Start when Windows starts: ✔️
        - Start new session on startup: ✔️
    - Webserver
        - Use web server: ✔️
        - Allow interaction via webserver: ✔️
        - Allow public access: ✔️
    - Devices
        - Set according to your setup
    - Advanced
        - Hide tray bar notifications: ✔️
        - Webcamera support: ✔️ (if you want to test with a webcamera this is helpful)

- Main Window
    - Choose the camera to use

Restart Digicamcontrol after configured.

DSLR cameras of different manufacturer may behave differently. There are some settings that might need to be adjusted if autofocus is slow or preview cannot be generated.
Tinker with available settings until it works properly. If you run into trouble, [create a new issue in the tracker](https://github.com/photobooth-app/photobooth-app/issues).

## Webcam PyAV Backend

In v8 the PyAV backend was added to efficiently stream from webcameras on Windows and Linux.
It requests the MJPG stream from the camera and allows to continuously run the camera with the highest resolution while creating a lores livestream for the preview.

To find which devices are available on your system check the following commands output.
Ensure the camera is recognized on the USB hub using `lsusb`.
Check the devices and get more information about the device, here `/dev/video0` is the device endpoint:
To setup the backend you need device path on Linux and the device name on Windows platform.

```bash title="Linux"
lsusb
v4l2-ctl --list-devices
v4l2-ctl -D -d /dev/video0 --list-formats
ffmpeg -hide_banner -f v4l2 -list_formats all -i /dev/video0
```

```bash title="Windows"

ffmpeg -hide_banner -f dshow -list_devices true -i dummy
ffmpeg -hide_banner -f dshow -list_formats all -i "video=Insta360 Link 2C"

```

Now finish setup:

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- Set the backend (pyav)
- Insert the camera name (windows) or /dev/videoX endpoint (windows)
- Change the resolution to a supported resolution, see above..

## Webcam V4l2 Backend

On Linux prefer v4l2 backend because it is more efficient in directly streaming MJPG data instead image frames like the opencv2 implementation.

To find which indexes are available on your system issue the following commands.
Ensure the camera is recognized on the USB hub:

```bash
lsusb
```

```bash title="check v4l2 indexes:"
python -c "from photobooth.services.backends.webcamv4l import *; print(available_camera_indexes())"
```

The command returns an array of indexes for which a webcam was detected.

Now finish setup:

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- set the backend (v4l)
- Consider changing the resolution requested from the camera on common tab.

## Webcam OpenCv2 Backend

!!! info
    This backend is deprecated, the pyav backend is superiour and more resource effective while offering more features. The backend might be removed in the future.

On Linux prefer v4l2 backend because it is more efficient in directly streaming MJPG data instead image frames like the opencv2 implementation.

Ensure the camera is recognized on the USB hub:

```bash
lsusb
```

```bash title="check opencv2 indexes:"
python -c "from photobooth.services.backends.webcamcv2 import *; print(available_camera_indexes())"
```

The command returns an array of indexes for which a webcam was detected.

Now finish setup:

- Set the index in the [admin center](http://localhost/#/admin/config), config, tab backends.
- set the backend (cv2)
- Consider changing the resolution requested from the camera on common tab.
