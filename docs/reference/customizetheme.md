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

## Adjust Livestream to cover the full screen

While the livestream looks nicer if it covers the full screen, some parts of the livestream can be cropped.
Thus the resulting photo shows a different aspect ratio and might not match the endusers intention.
So the default is to `contain` the background. If you want to change to `cover`, add the following rule to `private.css`.

```css
#preview-stream {
  background-size: cover
}

```

## Contribute, add your examples here

Reach out in a [discussion](https://github.com/photobooth-app/photobooth-app/discussions) to add your rules here so others can benefit from your work 🙏.
