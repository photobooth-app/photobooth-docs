# ![photobooth-app logo](https://raw.githubusercontent.com/mgrl/photobooth-app/main/assets/logo/logo-text-black-transparent.png)

Written in Python 🐍, coming along with a modern Vue frontend.

![PyPI](https://img.shields.io/pypi/v/photobooth-app)
[![python versions supported 3.9, 3.10, 3.11](https://img.shields.io/pypi/pyversions/photobooth-app)](https://pypi.org/project/photobooth-app/)
![rpi, linux and windows platform supported](https://img.shields.io/badge/platform-rpi%20%7C%20linux%20%7C%20windows-lightgrey)
[![ruff](https://github.com/mgrl/photobooth-app/actions/workflows/ruff.yml/badge.svg)](https://github.com/mgrl/photobooth-app/actions/workflows/ruff.yml)
[![pytest](https://github.com/mgrl/photobooth-app/actions/workflows/pytests.yml/badge.svg)](https://github.com/mgrl/photobooth-app/actions/workflows/pytests.yml)
[![codecov](https://codecov.io/gh/mgrl/photobooth-app/branch/dev/graph/badge.svg?token=SBB5DGX17V)](https://codecov.io/gh/mgrl/photobooth-app)

[Github source](https://github.com/mgrl/photobooth-app/) - [PyPI package](https://pypi.org/project/photobooth-app/) - [3d printable case](https://github.com/mgrl/photobooth-3d/) - [Issues](https://github.com/mgrl/photobooth-app/issues) - [Discussions](https://github.com/mgrl/photobooth-app/discussions)

This site contains the project documentation for the
photobooth app project.
Setup your own photobooth for your wedding, birthday and other occations.

![booth take a picture](./assets/take-picture.gif)

## Features

| Feature | [photobooth-app](https://github.com/mgrl/photobooth-app/) | [PhotoboothProject](https://github.com/PhotoboothProject/photobooth) | [PiBooth](https://github.com/pibooth/pibooth) |
|---|---|---|---|
| first version release | 2023 | 2016 | 2017 |
| Stars |![GitHub Repo stars](https://img.shields.io/github/stars/mgrl/photobooth-app?style=social)| ![GitHub Repo stars](https://img.shields.io/github/stars/PhotoboothProject/photobooth?style=social) |![GitHub Repo stars](https://img.shields.io/github/stars/pibooth/pibooth?style=social) |
| Community | ⏺️ new software, visit [discussions](https://github.com/mgrl/photobooth-app/discussions) | ✅ | ❌ issue tracker only |
| Reference system incl Box design | ✅ | ❌ | ❌ |
| **Camera and Image Features** |
| Cameras supported | DSLR, Webcam, Pi Camera Modules | DSLR, Webcam, Pi Camera Modules | DSLR, Webcam, Pi Camera Modules |
| Camera Backends Integrated | gphoto2, picamera2, v4l2py, opencv2 | all via cli commands | gphoto2, picamera, opencv2  |
| Camera live preview | ✅ | ⏺️ | ❌ |
| Take Picture | ✅ | ✅ | ✅ |
| Collagen | ❌ | ✅ | ✅ |
| Video | ❌ | ❌ | ❌ |
| Chromakeying | ✅ | ✅ | ❌ |
| Image Filter | ✅ [(instagram-like)](https://github.com/mgrl/pilgram2) | ✅ | ✅ |
| **Gallery** |
| Gallery local display | ✅ | ✅ | ❌ |
| Gallery external access via IP | ✅ | ✅ | ❌ |
| Sync images to USB drive | ❌ | ✅ | ❌ |
| Share images online via QR code | ✅ | ⏺️ | ✅ |
| Printing | ✅ | ✅ | ✅ |
| **Personalization** |
| Customizable Theme | ❌ | ✅ | ❌ |
| Translateable | ❌ | ✅ | ✅ |
| **Peripheral Hardware Integration** |
| Configurable GPIO trigger (RPI) | ✅ | ✅ | ✅ |
| Configurable keyboard trigger | ✅ | ✅ | ❌ |
| ws281x to signal capture | ✅ | ❌ | ❌ |
| **Admin** |
| Admin Backend | ✅ | ✅ | ❌ |
| Plugin Architecture | ❌ | ❌ | ✅ |
| **Dev** |
| Installable package | ✅ | ⏺️ install script | ✅ |
| Automated testing including hardware | ✅ [![codecov](https://codecov.io/gh/mgrl/photobooth-app/branch/main/graph/badge.svg?token=SBB5DGX17V)](https://codecov.io/gh/mgrl/photobooth-app) | ❌ | ❌ ![codecov](https://codecov.io/gh/pibooth/pibooth/branch/master/graph/badge.svg) |
| **Misc** |
| Platforms | Windows, Linux, Raspberry Pi | Windows, Linux, Raspberry Pi | Raspberry Pi, Linux (buster) |
| Stack runtime | python, vue-webapp | apache+php, html-webapp | python+pygame, desktop app |
