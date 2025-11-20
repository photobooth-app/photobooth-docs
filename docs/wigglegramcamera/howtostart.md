# How to Start?

## DIY Build Instructions

The build is described on the subsections here. Following is a helpful collection of links and hints, what to consider before starting.

1. You need the [photobooth-app](https://github.com/photobooth-app/photobooth-app) v8.5 or later installed.
  The photobooth-app is the frontend to the user when creating wigglegrams. Follow the [installation](../setup/installation.md) or [upgrade](../setup/update.md) guide install the app.
2. Build the Camera Array
    1. [Build the camera nodes](./build.md). The main components is a Pi Zero 2 and the camera module.
    2. [Build a 3d printed camera array](https://github.com/photobooth-app/photobooth-3d). You may go for the reference design or create your own solution to build the array.
    3. [Install](./install-nodes.md) the [nodes' software](https://github.com/photobooth-app/wigglecam). Each device is a separate computer and setup separately. Ansible comes to the rescue to simplify this task.
    4. [Setup the nodes in the photobooth-app](./setup-photobooth.md). Integrate the nodes with the app and calibrate the camera array to achieve smooth results.

## What if you get stuck?

Go over to [GitHub Discussions](https://github.com/photobooth-app/photobooth-app/discussions) and start a topic. Please provide as many information as possible because we do not know your exact setup to help you with.

If you find a bug, missing translation or docs being insufficient, post an [Issue](https://github.com/photobooth-app/wigglecam/issues)
