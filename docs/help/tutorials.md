# Tutorials

## Setup the photobooth app

### Prerequisites

### Installation

> **Note:** TODO: (for now most relevant steps are described in github repo)

### Managing the service

> **Note:** TODO: (for now most relevant steps are described in github repo)

## Setup Camera Backends

### Webcams

via v4l or cv2 on windows and linux

Check available webcam device numbers

```bash
python -c "from photobooth.services.backends.webcamv4l import *; print(available_camera_indexes())"
python -c "from photobooth.services.backends.webcamcv2 import *; print(available_camera_indexes())"
```

### Raspberry Pi Camera Modules

via picamera2

### DSLR

only linux gphoto2 currently.
