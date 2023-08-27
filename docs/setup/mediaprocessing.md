# Mediaprocessing

The mediaitems (images, videos, gifs) are postprocessed in a configurable pipeline consisting of several stages.
The pipeline starts with the original mediaitem. Next is the stage to remove a greenscreen, add texts and a new background. The final processed item is stored to the gallery.

## Examples

TODO

## Pipelines

The pipelines are different depending on the type of media.

### Picture-Pipeline

### Collage-Pipeline

Feature not yet implemented. You're invited to contribute :)

### GIF/Video-Pipeline

Feature not yet implemented. You're invited to contribute :)

### Print-Pipeline

Feature not yet implemented. You're invited to contribute :)

## Stages

### Chromakeying

Remove a color from the captured image.

### Instagram-Like Color-Filter

Apply a default color filter. Choose from [pilgram2's available filters](https://github.com/mgrl/pilgram2).
There is also the option for the user to change the filter in the gallery. See UI configuration in admin dashboard.

### Background Fill Solid Color

When using the chromakeying / background removal stages, the removed background is left empty and transparent. With this stage, the transparent area is filled with a solid color.

### Background Image

When using the chromakeying / background removal stages, the removed background is left empty and transparent. With this stage, the transparent area is filled with an image.

### Texts

Texts that are overlaid the finished image. Use it to easily individualize the images without having to create a new background images where a picture would get inserted to. Custom fonts are supported.
