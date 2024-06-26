# FAQ

## Photobooth app website not available

In default configuration the app listens to port 8000.
So the app can be reached from every computer in the same network on port 8000. On the same computer go to <http://localhost:8000>.

If the website is not available, the reason could be

- network issues or
- bad configuration

Check that the website is available on the device itself via <http://localhost:8000>.
If that works, the issue is about the network.

If not, the app might have crashed.

## Photobooth command not found

If there is a warning as following during pip installation and photobooth can't start check the PATH variable

The script `photobooth` is installed in '/home/pi/.local/bin' which is not on PATH.
Consider adding this directory to PATH.

See following is fine, might just need a restart after installation because the path .local/bin did not exist on newly installed systems.

```sh  title="~/.profile"
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```

## Gphoto2 camera found but no access

On a fresh Linux installation, there might be services running to detect cameras and allow for easy file transfer.
For the photobooth this needs to be disabled because the application needs access to the camera.

If you find errors in the log as below, read further.

```text
[    INFO] found camera - 0:  usb:001,009  Canon EOS 1100D (gphoto2.py:303)
[    INFO] (gp_libusb1_open [libusb1.c:437]) 'libusb_claim_interface (port->pl->dh, port->settings.usb.interface)' failed: Resource busy (-6) (port_log.py:89)
[    INFO] (gp_port_set_error [gphoto2-port.c:1190]) Could not claim interface 0 (Success). Make sure no other program (gvfs-gphoto2-volume-monitor) or kernel module (such as sdc2xx, stv680, spca50x) is using the device and you have read/write access to the device. (port_log.py:89)
[CRITICAL] camera failed to initialize. no power? no connection? (gphoto2.py:100)
[   ERROR] [-53] Could not claim the USB device (gphoto2.py:101)
[    INFO] (gp_libusb1_open [libusb1.c:437]) 'libusb_claim_interface (port->pl->dh, port->settings.usb.interface)' failed: Resource busy (-6) (port_log.py:89)
[    INFO] (gp_port_set_error [gphoto2-port.c:1190]) Could not claim interface 0 (Success). Make sure no other program (gvfs-gphoto2-volume-monitor) or kernel module (such as sdc2xx, stv680, spca50x) is using the device and you have read/write access to the device. (port_log.py:89)
```

Check for running processes:

```bash
$ ps ax | grep gphoto2
1074 ?        Ssl    0:00 /usr/libexec/gvfs-gphoto2-volume-monitor
2785 ?        Sl     0:00 /usr/libexec/gvfsd-gphoto2 --spawner :1.7 /org/gtk/gvfs/exec_spaw/2
```

To disable the monitoring services, execute following commands:

```sh
systemctl --user stop gvfs-gphoto2-volume-monitor
systemctl --user disable gvfs-gphoto2-volume-monitor 

# after a reboot, the gvfs-gphoto2-volume-monitor will be enabled automatically again :(
# permanently disable:
sudo chmod -x /usr/lib/gvfs/gvfs-gphoto2-volume-monitor

reboot
```

After a restart there should be no process any more:

```bash
$ ps ax | grep gphoto2
# nothing to see here...
```

Additional references:

- <https://github.com/gphoto/gphoto2/issues/181>

## Error Failed building wheel for component

```text
ERROR: Failed building wheel for cmake
      Failed to build cmake
      ERROR: Could not build wheels for cmake, which is required to install pyproject.toml-based projects
```

During pip installation cmake error can come up if not all prerequisites are complied with.

- Check to comply with prerequisites.
- OpenCV-python fails during installation on 32 bit Raspberry Pi OS. Use 64bit version.

[Check discussions for further help!](https://github.com/photobooth-app/photobooth-app/discussions)

## Two webcameras at the same time fail

It's possible to use two webcameras at the same time (one for stills, one for livestream). USB cameras can put a lot of load on the USB host and bandwith might not be sufficient. Use two different USB hosts (example 2.0 and 3.0) if errors like these appear.

```text
2024-04-29 20:48:21,634 [   ERROR] error setting prop=6 1196444237 (webcamcv2.py:214) proc28584
2024-04-29 20:48:21,634 [   ERROR] error setting prop=5 30.0 (webcamcv2.py:214) proc28584
2024-04-29 20:48:21,634 [   ERROR] error setting prop=3 640 (webcamcv2.py:214) proc28584
2024-04-29 20:48:21,634 [   ERROR] error setting prop=4 480 (webcamcv2.py:214) proc28584
Process WebcamCv2AquisitionProcess:
Traceback (most recent call last):
  File "C:\Program Files\Python311\Lib\multiprocessing\process.py", line 314, in _bootstrap
    self.run()
  File "C:\Program Files\Python311\Lib\multiprocessing\process.py", line 108, in run
    self._target(*self._args, **self._kwargs)
  File "D:\dev\photobooth\photobooth-app\photobooth\services\backends\webcamcv2.py", line 169, in cv2_img_aquisition
    raise OSError(f"cannot open camera index {_config.device_index}")
OSError: cannot open camera index 1

[ WARN:2@22.575] global cap_msmf.cpp:475 `anonymous-namespace'::SourceReaderCB::OnReadSample videoio(MSMF): OnReadSample() is called with error status: -1072873822
[ WARN:2@22.578] global cap_msmf.cpp:487 `anonymous-namespace'::SourceReaderCB::OnReadSample videoio(MSMF): async ReadSample() call is failed with error status: -1072873822
[ WARN:0@22.582] global cap_msmf.cpp:1768 CvCapture_MSMF::grabFrame videoio(MSMF): can't grab frame. Error: -1072873822
```
