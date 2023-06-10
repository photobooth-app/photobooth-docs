
# Setup Cameras

The photobooth app supports cameras utilizing multiple backends:

- picamera2 backend supports Raspberry Pi Camera Modules
- gphoto2 backend supports DSLR cameras on Linux platforms
- digicamcontrol backend supports DSLR cameras on Windows platforms (not yet implemented!)
- opencv2 backend supports USB webcameras on Linux and Windows platforms
- v4l2 backend supports USB webcameras on Linux

Two backends can be used simultaneously in hybrid mode.
The first backend is used as main backend to capture high quality still images.
The second backend is used as live backend to stream video preview only.

!!! note
    After changing config, the app needs to be restarted manually.

    If you need help setup a specific camera, [start a new discussion on github](https://github.com/mgrl/photobooth-app/discussions).

## Raspberry CSI Camera Modules

Camera modules are supported using picamera2 based on the new libcamera stack. Autofocus camera modules are supported.

The app is tested with following devices:

### Camera Module 3

The latest [Camera Module 3](https://www.raspberrypi.com/products/camera-module-3/) is probably the best camera module to use in the photobooth.
It supports fast autofocus and comes with native driver in the Raspberry Pi OS.

Ensure the camera is working properly using the libcamera stack:

```bash
libcamera-hello
```

If it does properly open the camera, the photobooth app can use it also.
If some errors come up, try to fix the camera setup before start using it actually.
Find [installation instructions](https://www.raspberrypi.com/documentation/accessories/camera.html#installing-a-raspberry-pi-camera) directly at the raspberry pi foundation.

Now finish setup:

- Set the index in the [admin center](http://localhost:8000/#/admin/config), config, tab backends.
- set the main backend to Picamera2
- Choose Picamera2 focuser module, set Continuous for camera module 3
- Enable livepreview if desired
- Change the resolution requested from the camera on common tab to width=4608, height=2592
- Restart the app

### Camera Modules 1/2/HQ

All other camera modules from the Raspberry Pi ecosystem work the same way as the latest camera module 3.
They usually come with lower image quality and do not have autofocus.
Due to this other camera modules are not recommended for use as main camera.
You might consider to use them only for livestream preview.

Setup is the same as for camera module 3 but with different resolution and no focuser module enabled.

### Arducam imx519

Sony's imx519 sensor used in [Arducam's imx519 camera module](https://www.arducam.com/product/imx519-autofocus-camera-module-for-raspberry-pi-arducam-b0371/) is supported by the
Raspberry Pi OS natively since about March 2023.

This means the module can be used with or without installing Arducams custom driver packages:

- without Arducams driver:
    - ➖No PDAF support
    - ➖Only interval based autofocus e.g. every 10 seconds
    - ➕More stable upgrades because no customized libcamera needs to be installed.
    - [install as described in discussions](https://github.com/mgrl/photobooth-app/discussions/23)
- with Arducams driver:
    - ➕PDAF support
    - ➕Continuous autofocus like camera module 3
    - ➖apt upgrade may break driver/libcamera from time to time
    - [install as described by Arducam](https://docs.arducam.com/Raspberry-Pi-Camera/Pivariety-Camera/Quick-Start-Guide/)

Now finish setup:

- Set the index in the [admin center](http://localhost:8000/#/admin/config), config, tab backends.
- set the main backend to Picamera2
- Choose Picamera2 focuser module, set Continuous if Arducams driver installed, otherwise choose Interval.
- Enable livepreview if desired
- Change the resolution requested from the camera on common tab to width=4656, height=3496
- Restart the app

### Other third party camera modules

In principle every camera supported by libcamera / picamera2 would work.
Since the cameras do not come with native support of the Raspberry Pi OS using them could be troublesome and it's untested.
[Start a discussion](https://github.com/mgrl/photobooth-app/discussions/categories/howtos-and-camera-specific-topics) if there is a camera not working properly.

## DSLR via gphoto2 (Linux)

The app is tested with a Canon 1100D. In general all [gphoto2 supported cameras](http://www.gphoto.org/proj/libgphoto2/support.php) can be used.
If the camera supports liveview a stream is created and being used as preview in the app.
If the camera does not support liveview, you might want to consider setup the app in hybrid mode.
Main camera would be the DSLR to take high quality images, the livestream is captured from a secondary backend.
As secondary backend most suitable is a webcamera or raspberry pi camera module.

Now finish setup:

- Set the index in the [admin center](http://localhost:8000/#/admin/config), config, tab backends.
- set the main backend to Gphoto2

DSLR cameras of different manufacturer may behave differently. There are some settings that might need to be adjusted if autofocus is slow or preview cannot be generated.
Tinker with available settings until it works properly. If you run into trouble, [create a new issue in the tracker](https://github.com/mgrl/photobooth-app/issues).

## DSLR via digicamcontrol (Windows)

> Implementation not yet finished, feel free to [contribute](./contribute.md) 😊

## Webcam

USB-webcams are integrated via two backends:

- Opencv2 (Linux/Windows) and
- v4l2 (Linux only).

On Linux prefer v4l2 backend because it is more efficient in directly streaming MJPG data instead image frames like the opencv2 implementation.

To use the webcam choose opencv2 or v4l2 as backend.

Both backends use a camera device index to open the camera. To find which indexes are available on your system issue the following commands.

```bash title="check v4l2 indexes:"
python -c "from photobooth.services.backends.webcamv4l import *; print(available_camera_indexes())"
```

```bash title="check opencv2 indexes:"
python -c "from photobooth.services.backends.webcamcv2 import *; print(available_camera_indexes())"
```

The command returns an array of indexes for which a webcam was detected.

Now finish setup:

- Set the index in the [admin center](http://localhost:8000/#/admin/config), config, tab backends.
- set the backend (cv2 or v4l) as main backend
- Consider changing the resolution requested from the camera on common tab.

## Hybrid: DSLR and second backend to stream

The app supports simultaneous use of two backends at the same time.
This is useful to grab high quality pictures from a DSLR camera via gphoto2 and livestream from a webcamera or picamera module.
Hybrid mode allows for live preview even if the DSLR camera is not capable to stream preview video.

In hybrid mode, the main backend is used for still images, the live backend for video streaming.
To enable hybrid mode:
    - configure main backend as normal
    - also configure live backend.

If a live backend is set, it is requested for video preview instead of the main backend.
