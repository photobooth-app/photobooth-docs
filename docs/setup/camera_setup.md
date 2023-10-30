
# Camera Setup

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

    If you need help setup a specific camera, [start a new discussion on github](https://github.com/photobooth-app/photobooth-app/discussions).

## Raspberry CSI Camera Modules

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

Why? Capture shall be with highest resolution supported. The whole data is used from sensor, nothing cropped. The lower resolution is chosen to be 2328x1748 because the cropping is the same. The captured scene in both modes is exactly the same, nobody will notice that the camera changed it's mode - except better quality in final images :)

### Camera Module 3

The latest [Camera Module 3](https://www.raspberrypi.com/products/camera-module-3/) is probably the best camera module to use in the photobooth.
It supports fast autofocus and comes with native driver in the Raspberry Pi OS.

Now finish setup:

- Set the index in the [admin center](http://localhost:8000/#/admin/config), config, tab backends.
- Set the main backend to Picamera2
- Choose Picamera2 focuser module, set Continuous for camera module 3
- Enable livepreview if desired
- Change the resolution requested from the camera for stills and preview, see table below.
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
They usually come with lower image quality and do not have autofocus.
Due to this other camera modules are not recommended for use as main camera.
You might consider to use them only for livestream preview.

Setup is the same as for camera module 3 but with different resolution and no focuser module enabled. See also the chapter above to list resolutions.

### Arducam imx519

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

- Set the index in the [admin center](http://localhost:8000/#/admin/config), config, tab backends.
- set the main backend to Picamera2
- Choose Picamera2 focuser module, set Continuous if Arducams driver installed, otherwise choose Interval.
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
Tinker with available settings until it works properly. If you run into trouble, [create a new issue in the tracker](https://github.com/photobooth-app/photobooth-app/issues).

## DSLR via digicamcontrol (Windows)

> Implementation not yet finished, feel free to contribute. 😊

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
