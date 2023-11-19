
# Integrate with Photobooth-Project

!!! info
    This photobooth-app nowadays has many [features](../features.md) that you would need for a fully functional booth.

    [Compare the feature list](../features.md) and open an [issue](https://github.com/photobooth-app/photobooth-app/issues) if you miss a feature.

    If you miss a feature consider to pair it with the [photobooth project](https://photoboothproject.github.io/).

!!! warning
    Change the port of the photobooth-app to a different port than 80, for example 8000. Port 80 is usually used by Apache/Nginx to serve the photoboothproject.

Following commands have to be set in photobooth project to use this app as streamingserver.
Works best if photobooth-app and photobooth-project installed on same device.
If installed on different device, replace <http://localhost> by the actual hostname.

```text title="Settings in photoboothproject"
take_picture_cmd: curl -o "%s" http://localhost:8000/aquisition/still | echo Done
take_picture_msg: Done
pre_photo_cmd: curl http://localhost:8000/aquisition/mode/capture
post_photo_cmd: curl http://localhost:8000/aquisition/mode/preview
preview_url: url("http://localhost:8000/aquisition/stream.mjpg")
background_defaults: url("http://localhost:8000/aquisition/stream.mjpg")
```
