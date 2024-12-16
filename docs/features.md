# Features

This table is comparing the photobooth-app with other open source photobooth software.
Commercial software like DSLRbooth is not taken into account.

| Feature | [photobooth-app](https://github.com/photobooth-app/photobooth-app/) | [PhotoboothProject](https://github.com/PhotoboothProject/photobooth) | [PiBooth](https://github.com/pibooth/pibooth) |
|---|---|---|---|
| first version release | 2023 | 2016 | 2017 |
| Stars |![GitHub Repo stars](https://img.shields.io/github/stars/photobooth-app/photobooth-app?style=social)| ![GitHub Repo stars](https://img.shields.io/github/stars/PhotoboothProject/photobooth?style=social) |![GitHub Repo stars](https://img.shields.io/github/stars/pibooth/pibooth?style=social) |
| Community | ➕➕ | ➕➕➕ | ➕ |
| Reference system incl Box design | ✅ | ❌ | ❌ |
| **Supported Cameras and Image Features** |
| Raspberry Pi Cameras: Picamera2 | ✅ | ⏺️[^2] | ⏺️[^1] |
| DSLR: Gphoto2 | ✅ | ✅[^2] | ✅ |
| DSLR: Digicamcontrol | ✅ | ✅[^2] | ❌ |
| Webcameras: opencv2 | ✅ | ✅[^2] | ✅ |
| Webcameras: v4l2py[^3] | ✅ | ❌ | ❌ |
| Camera live preview streaming | ✅ | ⏺️[^5] | ❌ |
| **Image Features and Postprocessing** |
| Capture single picture | ✅ | ✅ | ✅ |
| Capture collages | ✅ | ✅ | ✅ |
| Capture animated GIF | ✅ | ❌ | ❌ |
| Capture video | ✅ | ❌ | ❌ |
| [Instagram-Like Image Filter](https://github.com/photobooth-app/pilgram2) | ✅ | ❌ | ❌ |
| Background removal: Chromakeying | ✅ | ✅ | ❌ |
| Add predefined background | ✅ | ✅ | ❌ |
| Add frame with transparency to pictures | ✅ | ✅ | ❌ |
| **Gallery** |
| Gallery local display | ✅ | ✅ | ❌ |
| Gallery external access via IP | ✅ | ✅ | ❌ |
| Sync images to USB drive | ✅ | ✅ | ❌ |
| Share images online via QR code | ✅ | ⏺️[^4] | ✅ |
| Printing | ✅ | ✅ | ✅ |
| **Personalization** |
| Customizable Theme | ✅ | ✅ | ❌ |
| Translateable | ✅ | ✅ | ✅ |
| **Peripheral Integration** |
| Configurable GPIO trigger (RPI) | ✅ | ✅ | ✅ |
| Configurable keyboard trigger | ✅ | ✅ | ❌ |
| ws281x to signal capture | ✅ | ❌ | ❌ |
| REST-API | ✅ | ❌ | ❌ |
| **Admin** |
| Admin Backend | ✅ | ✅ | ❌ |
| Admin Configuration Panel | ✅ | ✅ | ❌ |
| Admin Backend Protected | ✅ | ✅ | ❌ |
| Plugin Architecture | ❌ | ❌ | ✅ |
| **Dev** |
| Installable package | ✅ | ⏺️ install script | ✅ |
| Automated testing including hardware |  [![codecov](https://codecov.io/gh/photobooth-app/photobooth-app/branch/main/graph/badge.svg?token=SBB5DGX17V)](https://codecov.io/gh/photobooth-app/photobooth-app) | ❌ | ![codecov](https://codecov.io/gh/pibooth/pibooth/branch/master/graph/badge.svg) |
| **Supported OS** |
| Raspberry Pi Bookworm | ✅ | ✅ | ❌ |
| Debian/Ubuntu | ✅ | ✅ | ✅ |
| Windows | ✅ | ✅ | ❌ |

[^1]: Picamera1 only, modules <= v2.1 only, no camera module 3 supported
[^2]: Integrated via command line interface and external programs
[^3]: Less CPU utilization than opencv2
[^4]: Manual custom sync to implement or client need to access wifi accesspoint
[^5]: local preview only
