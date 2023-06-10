
# Sync Online

(for file downloads via QR Code)

```bash
sudo apt-get install rclone inotify-tools
```

```bash
rclone config
```

Setup the remote named "boothupload"!

```bash
chmod u+x ~/photobooth-app/boothupload.sh
cp ~/photobooth-app/boothupload.service ~/.config/systemd/user/
systemctl --user enable boothupload.service
systemctl --user start boothupload
systemctl --user status boothupload
```
