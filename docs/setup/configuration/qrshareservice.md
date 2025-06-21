# Share Photos via QR Code

After setup, the users of the photobooth-app can download their images, gifs and videos simply by scanning a QR code.
The QR code points to the file directly or a portal that allows to reshare the media.
Using the portal, the user can share the media file using the apps on his or her smartphone.

<figure markdown>
  ![gallery_detail](../../assets/screenshots/gallery_detail.png){ width="400" }
  <figcaption>Scan the QR code to download image to smartphones.</figcaption>
</figure>

## Options to share via QR code

There are several ways to share media files to users. Method A is recommended for new setups.



### Method A: Use the synchronizer plugin (new in v8, recommended).

❕ Prerequisite: Public FTP-Server or NextCloud  
➕ Automatic immediate synchronization to FTP-Server, NextCloud and/or local filesystem  
➕ Easy setup   
➕ Convenient for user: Direct internet download  
➖ Images shared via (private) internet service might conflict with GDPR  

### Method B: Share via local WiFi-Hotspot.
❕ Prerequisite: Setup WiFi Accesspoint  
➖ Inconvenient for user: Smartphones need to log in local WiFi  
➖ Custom setup  
➕ No need to synchronize, no data usage  
➕ Local solution don't need any online service  
➕ Local solution less likely to conflict with GDPR  


### Method C: Sync images (on your own) and provide a custom URL users can download images
➕ Convenient for user: Direct internet download  
➕ Image backup on the fly  
➖ Custom setup  
➖ All images need to synchronize, uses more data  
➖ needs online service (usually paid webhosting service)  
➖ Images shared via (private) internet service might conflict with GDPR  


### Method D: dl.php shareservice (DEPRECATED since v8).
❕ Prerequisite: Needs php online service (usually paid webhosting service)  
➕ Easy setup  
➕ Convenient for user: Direct internet download  
➕ Data saver: On the fly upload when QR code is scanned  
➖ Images shared via (private) internet service might conflict with GDPR  
➖ Deprecated method, will be removed.  


## Method A: Share via Synchronizer Plugin

### Benefits

- secure: the photobooth does not need to expose a service to the internet
- immediate upload of media files: could serve as backup also
- works also with cellular internet service that usually provide no public ip address
- simple: just needs an FTP Server or a NextCloud instance in the public internet

### Setup

- In the Admin Center go to Configuration -> Synchronizer.
- Configure a FTP or NextCloud-Backend to sync to.
- Save the configuration.
- Take a picture and check the logs for issues during uploading.
- If there are no errors, scan the QR code and check if the photo is downloaded correctly to the smartphone.


## Method B: Share via local WiFi

If the shareservice is not what you want, you could create a local WiFi. Users log in that WiFi and can download directly from the photobooth.
Setup the URL for the QR code to point to the image you would like to let the user download. There are several versions of the images available, see the [list of mediaitem's directories](../../reference/foldersandurls.md#mediaitems).

Below an example URL to use in the QR code. {identifier} gets replaced by the acutal filename. Replace the IP and port by the actual data.

### Setup (Method B)

- DISABLE the qr share service in the admin config
- Set the http URL for the QR code as below:

```http title="Share Custom Qr Url example for v5 and later"
http://localhost:8000/media/full/{identifier}
```

```http title="Share Custom Qr Url example before v4"
http://localhost:8000/media/processed/full/{filename}
```

## Method C: Custom Solution

Custom solutions are out of scope of the documentation. You need to figure out a way to make the media files accessible.
Then configure the QR code custom URL to point to the corresponding URL.

```http title="Share Custom Qr Url example"
http://localhost:8000/media/full/{filename}
```


## Method D: dl.php qr shareservice

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
- Enable the qr share service in the admin config
- Pair the dl.php script with photobooth app by configuring the qr shareservice settings in photobooth admin config, tab common:
    - set shareservice_apikey to same value as in dl.php
    - set shareservice_url to the public URL pointing to the dl.php script.
    - choose whether to download the original file or the full processed version.
- Now restart the photobooth app and try to scan a QR code in the gallery.

### Troubleshooting

- check php error log in the folder where dl.php is located.
- ensure the dl.php directory has write-permission for the webserver.
- check photobooth error log.
- nginx needs to be [configured for longrunning http-requests](https://github.com/photobooth-app/photobooth-app/issues/140#issuecomment-1856841684)
