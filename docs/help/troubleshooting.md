# Troubleshooting

## Gather information to troubleshoot

The following commands help tracking down issues and gather information:

```bash
# logfiles from service (last 200 lines)
journalctl --user --unit=photobooth-app -n 200 --no-pager

# logfiles created by photobooth every day
ls ~/photobooth-data/log/
cat ~/photobooth-data/log/photobooth_2023xxxx.log

# check CmaFree especially for Arducams if low:
cat /proc/meminfo
```

## Manually start the app

If service crashed 💀, stop the service and maybe even kill the python process:

```bash
# stop the photobooth service (if installed)
systemctl --user stop photobooth-app

# check whether there is a process still running but not responsive:
ps ax | grep python3

# kill it
sudo pkill -9 python3
```

Manually start the photobooth-app and watch the terminal

!!! info
    The app uses current directory as data directory! Ensure to `cd` to the correct directory before starting.

```bash
photobooth
#or
python -m photobooth
```

Watch the terminal for errors and try to debug. If you fail, start a [discussion](https://github.com/photobooth-app/photobooth-app/discussions).

## Bind error during app startup

The app can be started only once, because it will access devices like usb cameras that only allow one connection anyways.

If a second instance is started, the app stops with a bind error message similar as follows:
```txt
[Errno 98] error while attempting to bind on address ('0.0.0.0', 8000): die adresse wird bereits verwendet
```

Usually, the reason is there is an instance running as a service in the background, while starting a second instance on the terminal.
[Stop the service](#manually-start-the-app) and start the app manually again in the terminal.