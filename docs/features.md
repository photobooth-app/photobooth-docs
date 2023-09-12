# Features

This table is comparing the photobooth-app with other open source photobooth software.
Commercial software like DSLRbooth is not taken into account.

| Feature | [photobooth-app](https://github.com/mgrl/photobooth-app/) | [PhotoboothProject](https://github.com/PhotoboothProject/photobooth) | [PiBooth](https://github.com/pibooth/pibooth) |
|---|---|---|---|
| first version release | 2023 | 2016 | 2017 |
| Stars |![GitHub Repo stars](https://img.shields.io/github/stars/mgrl/photobooth-app?style=social)| ![GitHub Repo stars](https://img.shields.io/github/stars/PhotoboothProject/photobooth?style=social) |![GitHub Repo stars](https://img.shields.io/github/stars/pibooth/pibooth?style=social) |
| Community | ⏺️ new software, visit [discussions](https://github.com/mgrl/photobooth-app/discussions) | ✅ | ❌ issue tracker only |
| Reference system incl Box design | ✅ | ❌ | ❌ |
| **Camera and Image Features** |
| DSLR cameras | ✅ | ✅ | ✅ |
| Webcameras | ✅ | ✅ | ✅ |
| Raspberry Pi Camera Modules | ✅ | ⏺️ | ✅ < v2.1 only |
| Camera backends integrated | gphoto2, picamera2, v4l2py, opencv2 | all via cli commands | gphoto2, picamera, opencv2  |
| Camera live preview | ✅ | ⏺️ | ❌ |
| Take Picture | ✅ | ✅ | ✅ |
| Collagen | ✅ | ✅ | ✅ |
| Video | ❌ | ❌ | ❌ |
| Chromakeying | ✅ | ✅ | ❌ |
| [Instagram-Like Filter](https://github.com/mgrl/pilgram2) | ✅ | ❌ | ❌ |
| **Gallery** |
| Gallery local display | ✅ | ✅ | ❌ |
| Gallery external access via IP | ✅ | ✅ | ❌ |
| Sync images to USB drive | ❌ | ✅ | ❌ |
| Share images online via QR code | ✅ | ⏺️ | ✅ |
| Printing | ✅ | ✅ | ✅ |
| **Personalization** |
| Customizable Theme | ❌ | ✅ | ❌ |
| Translateable | ❌ | ✅ | ✅ |
| **Peripheral Integration** |
| Configurable GPIO trigger (RPI) | ✅ | ✅ | ✅ |
| Configurable keyboard trigger | ✅ | ✅ | ❌ |
| ws281x to signal capture | ✅ | ❌ | ❌ |
| REST-API | ✅ | ❌ | ❌ |
| **Admin** |
| Admin Backend | ✅ | ✅ | ❌ |
| Plugin Architecture | ❌ | ❌ | ✅ |
| **Dev** |
| Installable package | ✅ | ⏺️ install script | ✅ |
| Automated testing including hardware | ✅ <br> [![codecov](https://codecov.io/gh/mgrl/photobooth-app/branch/main/graph/badge.svg?token=SBB5DGX17V)](https://codecov.io/gh/mgrl/photobooth-app) | ❌ | ❌ <br> ![codecov](https://codecov.io/gh/pibooth/pibooth/branch/master/graph/badge.svg) |
| **Misc** |
| Platforms | Windows, Linux, Raspberry Pi | Windows, Linux, Raspberry Pi | Raspberry Pi, Linux (buster) |
| Stack runtime | python, vue-webapp | apache+php, html-webapp | python+pygame, desktop app |
