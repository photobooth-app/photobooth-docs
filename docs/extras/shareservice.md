# Share images via QR Code

The share service allows users to easily download images on the user's phone.
The user simply scans the QR code to download.

<figure markdown>
  ![gallery_detail](../assets/screenshots/gallery_detail.jpg){ width="400" }
  <figcaption>Scan the QR code to download image to smartphones.</figcaption>
</figure>

## Working Principle

It's developed with ease of use in mind and shall work on most systems even with firewalled internet connection on photobooth side like cellular services.
Once setup, the prinicple is as following:

- photobooth starts and creates a long-term connection via internet (wifi, ethernet or cellular) to a php script on your webhosting service.
- now if a QR code is scanned, the php script sends an upload request via the long-term connection to the photobooth
- the photobooth uploads the requested file
- once upload is finished, the image is displayed to the user

### Benefits

- secure: the photobooth does not need to expose a service to the internet
- saves data: only images that are requested via QR code are transferred via internet
- works also with cellular internet service that usually provide no public ip address
- simple: just one php file to setup

## Setup

- [download dl.php](https://github.com/mgrl/photobooth-app/blob/main/extras/shareservice/dl.php)
- edit the config variables on top of dl.php. see the comments in dl.php for reference.
- place the edited dl.php on a public server, for example your shared hoster. The server must be available to the photobooth and the users downloading photos later.
- Pair the dl.php script with photobooth app by configuring the shareservice settings in photobooth admin config, tab common:
    - set shareservice_apikey to same value as in dl.php
    - set shareservice_url to the public URL pointing to the dl.php script.
    - choose whether to download the original file or the full processed version.
- Now restart the photobooth app and try to scan a QR code in the gallery.

## Troubleshooting

- check php error log in the folder where dl.php is located
- check photobooth error log
