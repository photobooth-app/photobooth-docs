# Share via QR Code

The share service allows users to easily download images on the user's phone.
The user simply scans the QR code to download.

<figure markdown>
  ![gallery_detail](../assets/screenshots/gallery_detail.png){ width="400" }
  <figcaption>Scan the QR code to download image to smartphones.</figcaption>
</figure>

## Options to share via QR code

- Method A: Use the batteries included shareservice.
    - ➕ Easy setup
    - ➕ Convenient for user: Direct internet download
    - ➕ Data saver: On the fly upload when QR code is scanned
    - ➖ needs php online service (usually paid webhosting service)
    - ➖ Images shared via (private) internet service might conflict with GDPR
- Method B: Share via local WiFi-Hotspot.
    - ➖ Inconvenient for user: Smartphones need to log in local WiFi
    - ➕ No need to synchronize, no data usage
    - ➕ Local solution don't need any online service
    - ➕ Local solution less likely to conflict with GDPR
    - ➖ Custom setup
- Method C: Sync images (on your own) and provide a custom URL users can download images
    - ➕ Convenient for user: Direct internet download
    - ➕ Image backup on the fly
    - ➖ Custom setup
    - ➖ All images need to synchronize, uses more data
    - ➖ needs online service (usually paid webhosting service)
    - ➖ Images shared via (private) internet service might conflict with GDPR

## Method A: Batteries included shareservice

### Benefits

- secure: the photobooth does not need to expose a service to the internet
- saves data: only images that are requested via QR code are transferred via internet
- works also with cellular internet service that usually provide no public ip address
- simple: just one php file to setup

### Working Principle

It's developed with ease of use in mind and shall work on most systems even with firewalled internet connection on photobooth side like cellular services.
Once setup, the prinicple is as following:

- photobooth starts and creates a long-term connection via internet (wifi, ethernet or cellular) to a php script on your webhosting service.
- now if a QR code is scanned, the php script sends an upload request via the long-term connection to the photobooth
- the photobooth uploads the requested file
- once upload is finished, the image is displayed to the user

### Setup

- [download dl.php](https://github.com/photobooth-app/photobooth-app/blob/main/extras/shareservice/dl.php)
- edit the config variables on top of dl.php. see the comments in dl.php for reference.
- place the edited dl.php on a public server, for example your shared hoster. The server must be available to the photobooth and the users downloading photos later.
- Pair the dl.php script with photobooth app by configuring the shareservice settings in photobooth admin config, tab common:
    - set shareservice_apikey to same value as in dl.php
    - set shareservice_url to the public URL pointing to the dl.php script.
    - choose whether to download the original file or the full processed version.
- Now restart the photobooth app and try to scan a QR code in the gallery.

### Troubleshooting

- check php error log in the folder where dl.php is located.
- ensure the dl.php directory has write-permission for the webserver.
- check photobooth error log.
- nginx needs to be [configured for longrunning http-requests](https://github.com/photobooth-app/photobooth-app/issues/140#issuecomment-1856841684)

## Method B: Share via local WiFi

If the shareservice is not what you want, you could create a local WiFi. Users log in that WiFi and can download directly from the photobooth.
Setup the URL for the QR code to point to the image you would like to let the user download. There are several versions of the images available, see the [list of mediaitem's directories](../reference/foldersandurls.md#mediaitems).

Below an example URL to use in the QR code. {filename} gets replaced by the acutal filename. Replace the IP and port by the actual data.

```http title="QR code URL example"
http://192.168.0.1:8000/media/processed/full/{filename}
```

## Method C: Create your own sharing solution

If the shareservice is not what you want, you can synchronize the data folder manually and share a link to the images.
The QR code is pointing to an URL that needs to be accessible by the users smartphone. This is possible if the user connects to a local hotspot in the same network as the photobooth computer or the files can be uploaded to the internet to make them accessible.
