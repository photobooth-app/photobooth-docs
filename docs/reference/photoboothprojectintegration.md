
# Integrate Photobooth-Project and this Photobooth-App

!!! info
    This photobooth app is not yet feature complete.
    If you miss a feature consider to pair it with the [photobooth project](https://photoboothproject.github.io/).

Once this app and photobooth project is installed, integrate them using the settings below in photobooth project.

Following commands have to be set in photobooth project to use this app as streamingserver.
Works best if photobooth-app and photobooth-project installed on same device.
If installed on different device, replace <http://localhost> by the actual hostname.

```text
take_picture_cmd: curl -o "%s" http://localhost:8000/aquisition/still | echo Done
take_picture_msg: Done
pre_photo_cmd: curl http://localhost:8000/aquisition/mode/capture
post_photo_cmd: curl http://localhost:8000/aquisition/mode/preview
preview_url: url("http://localhost:8000/aquisition/stream.mjpg")
background_defaults: url("http://localhost:8000/aquisition/stream.mjpg")
```
