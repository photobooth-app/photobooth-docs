# Buzzer

Use this bluetooth buzzer to trigger actions in the photobooth.

## Big Red Hot Button

![buzzer loading](../assets/buzzer/buzzer-loading.jpg){ width="300" }

This action button is based on an ESP board powered by battery.
It emulates a bluetooth keyboard and thus can be used with the photobooth-app or other photobooth projects that use keyboard input to trigger actions.

### Hardware and Assembly

See separate git repository <https://github.com/photobooth-app/photobooth-buzzer>.
The button might have a twist and turn unlock mechanism. It can be removed easily to convert it to a normal button.

### ESP Microcontroller Software

See separate git repository <https://github.com/photobooth-app/photobooth-buzzer>.

### Setup in photobooth app

Go to admin dashboard -> configure -> tab: hardwareinputoutput.

- Enable keyboard input
- choose the character (default = i) to take a picture.
