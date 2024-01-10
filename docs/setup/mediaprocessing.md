# Postprocess Captures

The mediaitems (images, collages, animated gifs) are postprocessed in a configurable pipeline consisting of several stages.
The pipeline starts with the original mediaitem. The different media types can have differently configured pipelines that process the image one by one. The processed mediaitem is stored to the gallery finally.

## Examples

### Single Images

Single images are captured in one shot.
The image can be modified, eg. add a new frame on top of the image and some custom text like in the example below:

![image demo](../assets/mediaprocessing/image_demo.jpg)

### Collages

Collages are merged from several images. These can be captured images from camera and being mixed with predefined images.
Each capture can be modified, eg. remove the greenscreen and add a new background before merging in the collage.
Following is an example how the collage is processed:

![collage demo](../assets/mediaprocessing/collage_demo.jpg)

## Pipelines

Depending on the job type

- [single picture](http://localhost:8000/#/admin/config/mediaprocessing_pipeline_singleimage) or
- [collage](http://localhost:8000/#/admin/config/mediaprocessing_pipeline_collage) or
- [animation](http://localhost:8000/#/admin/config/mediaprocessing_pipeline_animation) or
- printing

there are different postprocess pipelines available. They can be configured in the admin dashboard, so above links work only on your computer with the photobooth app running.
The pipeline consists of several stages, each can be enabled and configured separately, see next chapter.

## Basics

- Coordinate system: 0/0 is top/left.

### Picture-Pipeline

The single image pipeline runs following stages in given sequence:

1. remove chromakey (greenscreen removal), replace by transparency
2. apply pilgram2 filter (instagram like filters)
3. fill background with a solid color
4. add background image (useful only if no solid color was added)
5. add a frame with transparent areas. Captured images shine through transparent area. Use PNGs with transparency!
6. text overlay

### Collage-Pipeline

The collage pipeline runs following stages in given sequence:

  1. run single images stages (chromakey, pilgram2, background only)
  2. merge captured images and predefined images on one canvas
  3. fill background with a solid color
  4. add background image (useful only if no solid color was added)
  5. place image on top. Captured images shine through transparent area. Use PNGs with transparency!
  6. text overlay

![collage pipeline example](../assets/mediaprocessing/collage_pipeline_example.png)

### Animated GIF-Pipeline

The gifs are made out of single captures, not a video.
The animated gif pipeline runs following stages in given sequence:

  1. run single images stages (currently only texts)
  2. line up captured images as defined in one GIF

### Video-Pipeline

Feature not yet implemented. You're invited to contribute. 👋

### Print-Pipeline

Feature not yet implemented. You're invited to contribute. 👋

## Stages

### Chromakeying

Remove a color from the captured image. Removed parts will be transparent.
TODO: add more description about how to choose the green value.

### Instagram-Like Color-Filter

Apply a default color filter. Choose from [pilgram2's available filters](https://github.com/photobooth-app/pilgram2).
There is also the option for the user to change the filter in the gallery. See UI configuration in admin dashboard.

### Background Fill Solid Color

When using the chromakeying / background removal stages, the removed background is left empty and transparent. With this stage, the transparent area is filled with a solid color.

### Background Image

When using the chromakeying / background removal stages, the removed background is left empty and transparent. With this stage, the transparent area is filled with an image.

### Frame Image

Single images captured can be overlaid by a frame. For this stage you need a PNG with transparent area. The captured image will be inserted in the transparent area. The width and height of the transparent area is automatically calculated and the algorithm tries to fit most of the captured area. If aspect ratio of captured image and transparent area are very different, some parts of the captured image can be cropped.

### Texts

Texts that are overlaid the finished image. Use it to easily individualize the images without having to create a new background images where a picture would get inserted to. Custom fonts are supported.
