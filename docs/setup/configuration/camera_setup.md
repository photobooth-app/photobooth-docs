# Camera Setup (Backends)

The photobooth app supports cameras utilizing multiple backends:

| Backend                                                    | Cameras                     | Platforms           |
| ---------------------------------------------------------- | --------------------------- | ------------------- |
| `picamera2`                                                | Raspberry Pi Camera Modules | Raspberry Pi        |
| `gphoto2`                                                  | DSLR                        | Linux, Mac          |
| `digicamcontrol` (deprecated, digicamcontrol unmaintained) | DSLR                        | Windows             |
| `pyav`                                                     | USB Webcams                 | Windows, Linux, Mac |
| `v4l2`                                                     | USB Webcams                 | Linux               |

Multiple backends can be used simultaneously. For example, the first backend is used for high quality still images,
the second backend is used to stream video preview only.

If you need help setup a specific camera, [start a new discussion on github](https://github.com/photobooth-app/photobooth-app/discussions).

## Picamera2

Camera modules are supported using picamera2 based on the new libcamera stack. Autofocus camera modules are supported.
The app is tested with OEM cameras from the Raspberry Pi foundation. Alternative modules might also work but it is untested.

Before start using a camera in the photobooth-app, ensure the camera is working properly using the libcamera stack:

```bash
rpicam-hello
```

If it does properly open the camera, the photobooth-app can use it also.
If some errors come up, try to fix the camera setup before start using it actually.
Find [installation instructions](https://www.raspberrypi.com/documentation/accessories/camera.html#installing-a-raspberry-pi-camera) directly at the Raspberry Pi foundation or the camera manufacturer.

### Setup the Camera Module

The latest [Camera Module 3](https://www.raspberrypi.com/products/camera-module-3/) is probably the best camera module to use in the photobooth-app. It supports fast autofocus and comes with native driver in the Raspberry Pi OS.

The photobooth-app switches between a high resolution camera mode for stills and a lower resolution camera mode for video/livepreview.
Time to find out which resolutions to use! Issue in the terminal following command:

```bash
rpicam-hello --list-cameras
```

```title="Raspberry Pi Camera Module 3 (imx708)" hl_lines="4 5"
pi@photobooth:~ $ rpicam-hello --list-cameras
0 : imx708 [4608x2592] (/base/soc/i2c0mux/i2c@1/imx708@1a)
    Modes: 'SRGGB10_CSI2P' : 1536x864 [120.13 fps - (0, 0)/4608x2592 crop]
                             2304x1296 [56.03 fps - (0, 0)/4608x2592 crop]
                             4608x2592 [14.35 fps - (0, 0)/4608x2592 crop]
```

In this case, the last two modes will have feasible resolutions:

- The still capture shall be made with the highest resolution supported. The whole data is used from sensor, nothing is cropped.
- The video/livepreview resolution is chosen to be 2328x1748 because the cropping is the same (0, 0). This way, the captured scene in both modes is exactly the same, nobody will notice that the camera changed it's mode - except better quality in final images ✨

Now finish the setup:

- Set the `backend type` to Picamera2
- Set the `camera num`, usually 0. 1 if you have a second camera attached to the Pi.
- The default resolution values are optimized for the camera module 3, already. It's the following values:
    - `Capture Cam Resolution Width` = 4608, sensor resolution set for still capture mode
    - `Capture Cam Resolution Height` = 2592
    - `Preview Cam Resolution Width` = 2304, sensor resolution set in video mode
    - `Preview Cam Resolution Height` = 1296
    - `Liveview Resolution Width` = 1152, downsampled resolution for livestreams
    - `Liveview Resolution Height` = 648
- The other settings are usually decent, but depending on your setup you might increase framerates to achieve a smoother live-preview or enable low-light optimization. In low light optimized mode, the analogue gain is further increased to reduce motion blur while getting noisier images.
- Restart the photobooth-app

### Other OEM- / third party-modules

In principle every camera supported by libcamera / picamera2 would work.
Setup is the same as for camera module 3 but with different resolution. See also the chapter above to list resolutions.

All other camera modules from the Raspberry Pi ecosystem work the same way as the latest camera module 3.
They usually have a lower image quality and do not have autofocus. Due to this other camera modules are not recommended for use as main camera. You might consider to use them only for livestream preview.

Third party camera modules do not come with native support of the Raspberry Pi OS usually, so using them could be troublesome and it's untested.
Third party camera modules tend to come with custom drivers which can break during system upgrades. You are on your own going this way.

## Gphoto2

The app is tested with a Canon 1100D. In general all [gphoto2 supported cameras](http://www.gphoto.org/proj/libgphoto2/support.php) can be used.
If the camera supports liveview a stream is created and being used as preview in the app.
If the camera does not support liveview, you might want to consider to setup the app with two backends so one is for stills, the other one for preview/video.
The main camera would be the DSLR to take high quality images, the livestream is captured from a secondary backend.
As secondary backend most suitable is a webcamera or raspberry pi camera module.

Now finish setup:

- Set the backend to Gphoto2

DSLR cameras of different manufacturer may behave differently. There are some settings that might need to be adjusted if autofocus is slow or preview cannot be generated.
Tinker with available settings until it works properly. If you run into trouble, [create a new issue in the tracker](https://github.com/photobooth-app/photobooth-app/issues).

!!! note

    Linux systems automatically mount the camera on connection. This interferes with the photobooth, since the app needs exclusive access.
    Check this [guide on how to disable `gvfs-gphoto2-volume-monitor`](https://photobooth-app.org/help/faq/#gphoto2-camera-found-but-no-access)

## Webcam PyAV

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
ffmpeg -hide_banner -f dshow -list_options true -i "video=Insta360 Link 2C"
```

```bash title="Mac"

ffmpeg -hide_banner -f avfoundation -list_devices true -i ""

```

Now finish setup:

- Set the backend to WebcamPyav
- Set the device identifier, there should be a dropdown to choose from
- Insert the camera name (windows) or /dev/videoX endpoint (Windows, Mac)
- Change the resolution to a supported resolution

## Webcam V4l2

Ensure the camera is recognized on the USB hub:

```bash
lsusb
```

The command returns an array of indexes for which a webcam was detected.

Now finish setup:

- Set the backend to WebcamV4l
- Set the camera identifier, there should be a dropdown to choose from
- Change the resolution to a supported resolution

## Digicamcontrol

!!! info

    This backend is deprecated. Digicamcontrol is not actively maintained since long time. We keep the backend in the app for now, but remove it, when the Digicamcontrol-software breaks at one point in the future.

The app is tested with a webcamera in Digicamcontrol. In general all [digicamcontrol supported cameras](https://digicamcontrol.com/cameras) can be used.
If the camera supports liveview a stream is created and being used as preview in the app.
If the camera does not support liveview, you might want to consider to setup the app with two backends so one is for stills, the other one for preview/video.
The main camera would be the DSLR to take high quality images, the livestream is captured from a secondary backend.
As secondary backend most suitable is a webcamera or raspberry pi camera module.

### Setup Photobooth-App

- Set the main backend to Digicamcontrol

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
