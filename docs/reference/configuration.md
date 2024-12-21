
# Configuration

The configuration is divided in several categories. All configuration items have a description, following information give a higher level overview.

## Common

Some very basic settings.

## Actions and Trigger

The photobooth app offers four different modes to capture currently:

- Single images,
- Collages,
- Animations and
- Videos.

Each action can be triggered by one or more of the following triggers:

- touch buttons on the main screen of the webapp (frontpage),
- GPIO pins on a Raspberry Pi,
- keyboard input or
- via another custom app that calls the [Rest-API](./api.md).

### Actions

Create one or more actions for every mode. Example: Create two actions in the category single image with different themed frames that overlay the captured image.

#### Single Images

Just one still captured by the camera. You can apply a frame and add texts to the final image as well as a color-filter similar like Instagram.

#### Collages

One or more images captured by the camera, stitched together in one final image. It's also possible to use predefined images that are embedded in every collage instead a capture. You can apply a frame and add texts to the final image as well as a color-filter similar like Instagram.

#### Animations (GIF)

One or more images captured by the camera, sequenced in a GIF animation. The result is not a video! It's also possible to use predefined images that are embedded in every animation instead a capture. You can apply a frame and add texts to the final image as well as a color-filter similar like Instagram.

#### Videos

Captures a live video. Audio is not supported currently.

### Trigger

#### Touch buttons on the screen

To display a trigger button on the main screen of the app, define in the trigger section of an action a title and/or an icon.
The icon can be any material design icon.

#### GPIO

To trigger an action via GPIO define the pin and choose when to trigger the action (on press, on release or after hold).

!!! info
    Enable the GPIO service in admin dashboard -> configuration -> hardwareinput/output!

!!! warning
    Each pin can be used only one time! Check the log for errors if it does not work as expected.

 [See the GPIO section how to wire the buttons](../setup/gpio.md).

#### Keyboard

To trigger an action via keypress define the keycode. If you're unsure what keycode to use, open the browser console and press the key to check for the keycode. The keycodes are captured by the browser.

!!! info
    Enable the keyboard processing in admin dashboard -> configuration -> hardwareinput/output!

## Questions remain?

Reach out in a [discussion](https://github.com/photobooth-app/photobooth-app/discussions).
