# Troubleshooting

## Photobooth app website not available

In default configuration the app listens to 0.0.0.0:8000,
so it can be reached from every computer in the same network on port 8000.

If the website is not available, the reason could be

- network issues or
- bad configuration

Check that the website is available on the device itself via <http://localhost:8000>.
If that works, the issue is about the network.

If not, the app might have crashed.

The following commands help tracking down issues and gather information:

```bash
# logfiles from service (last 200 lines)
journalctl --user --unit=photobooth-app -n 200 --no-pager
# logfiles created by photobooth
cat ~/photobooth-data/log/qbooth.log
# check CmaFree especially for Arducams if low:
cat /proc/meminfo
```

If service crashed 💀, kill the python process:

```bash
# check whether there is a process still running but not responsive:
ps ax | grep python3
# kill it
sudo pkill -9 python3
```

Manually start the photobooth-app and watch the terminal

```bash
photobooth 
#or
python -m photobooth
```

## Photobooth command not found

If there is a warning as following during pip installation and photobooth can't start check the PATH variable

```text
WARNING: The script photobooth is installed in '/home/pi/.local/bin' which is not on PATH.
Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
```

See following is fine, might just need a restart after installation because the path .local/bin did not exist before.

```sh  title="~/.profile"
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```
