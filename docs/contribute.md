# 🚀 Contribute

If you find an issue, please post it <https://github.com/mgrl/photobooth-app/issues>

## Development

Develop on Windows or Linux using VScode.
Additional requirements

- backend development
  - pip install pipreqs
  - pip install pytest
- frontend development
  - nodejs 16 (nodejs 18 fails proxying the devServer)
  - yarn
  - quasar cli <https://quasar.dev/start/quasar-cli>

## Testing

Tests are run via Github Actions on push and pull requests.
The tests run in the Cloud on hosted Github runners as well as on a self-hosted runner for hardware testing.

### Selfhosted Github Runner

Supports additional tests for hardware:

- Raspberry Pi Camera Module 3 connected to test picamera2 and autofocus algorithms
- WLED module is connected to test LED effects on thrill and shoot
- gphoto2 is installed with virtual ptp device
  - install latest dev with gphoto2 updater,  modify configure command as described here <https://github.com/gphoto/libgphoto2/issues/408>)
  - add photos libgphoto provides when capture is requested to /usr/share/local/libgphoto2_port/xxxversion/vcamera/
- webcamera is connected to test cv2 and v4l backends
