# HowTo Guides

> **Note:** TODO:

This part of the project documentation focuses on a
**problem-oriented** approach. You'll tackle common
tasks that you might have, with the help of the code
provided in this project.

## ⁉️ Troubleshooting

Check following commands and files for error messages:

```zsh
# logfiles from service (last 200 lines)
journalctl --user --unit=photobooth -n 200 --no-pager
# logfiles created by photobooth
cat ~/photobooth-app/log/qbooth.log
# check CmaFree especially for Arducams if low:
cat /proc/meminfo
```

If service crashed 💀, kill the python process:

```zsh
sudo pkill -9 python3
```
