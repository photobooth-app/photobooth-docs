# Customize the Theme

To customize the visual apperiance of the photobooth app, add your rules to the `./userdata/private.css` file.

## Example: Adjust the Buttons' Size on the Frontpage

Depending on your screen you might want to reduce the size of the buttons on the frontpage. First rule changes the text, second the icon size.

```css
.action-button {
    font-size: 1.0rem;
}
.action-button *>.q-icon {
    font-size: 4.5rem;
}
```

## Adjust the Livestream

You may want to change the preview video element to cover the full screen and zoom in a bit. Zooming in is useful in a two camera setup to adjust the image window of the livepreview (needs to capture a larger scene) to the camera capturing the still images.

While the livestream looks nicer if it covers the full screen, some parts of the livestream can be cropped.
Thus the resulting photo shows a different aspect ratio and might not match the endusers intention.
So the default is to `contain` the background. If you want to change to `cover`, add the following rule to `private.css`.

```css
#preview-stream {
  background-size: cover; /* default: contain to avoid cropping */
  transform: scale(1.5); /* default: 1.0 to apply no zoom. 1.5 zooms in, smaller values than 1.0 usually make no sense */
}

```

## Contribute, add your examples here

Reach out in a [discussion](https://github.com/photobooth-app/photobooth-app/discussions) to add your rules here so others can benefit from your work 🙏.
