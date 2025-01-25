
# Sync Online using rclone

Could be used as starting point building your own share solution.

```bash
sudo apt-get install rclone inotify-tools
```

Setup the remote named "boothupload"!

```bash
rclone config
```

This script is a template for boothupload.sh

```bash
#!/bin/bash

#setup rclone with "rclone config" first! use "boothupload" as remote name

SOURCE_DIR="$HOME/photobooth-data/media/"
DEST_DIR="boothupload:/"

#wait until wifi established for init sync.
sleep 10

while [[ true ]] ; do
 rclone sync --progress $SOURCE_DIR $DEST_DIR
 sleep 1
 inotifywait --timeout 300 -e modify,delete,create,move $SOURCE_DIR
done
```

```bash
[Unit]
Description=rclone upload service
#After=default.target

[Service]
Type=simple
Restart=always
ExecStart=%h/boothupload.sh

[Install]
WantedBy=default.target

## enable service and autostart on system startup:
#1 cp ~/boothupload.service ~/.config/systemd/user/
#2 systemctl --user enable boothupload.service
#3 systemctl --user start boothupload
#4 systemctl --user status boothupload
```
