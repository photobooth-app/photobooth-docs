# Folders and URLs

## Special URLs

| Description   | Web access |
|---|---|
|  Gallery to be used on second display in standalone mode. It will not allow to escape the gallery, there is no button to return to frontpage. | `http://IP:PORT/#/standalone/gallery` |
|  Random slideshow to be used on second display in standalone mode. It will not allow to escape the gallery, there is no button to return to frontpage. | `http://IP:PORT/#/standalone/slideshow` |
|  After a timeout a slideshow is automatically started. It will allow to escape the slideshow, there is a button to return to frontpage. | `http://IP:PORT/#/slideshow/random` |
|  Custom CSS to override default CSS  | `http://IP:PORT/private.css` |

## Folders on disk and their URL

!!! info
    Photobooth uses the current working directory to store all data.

    All subfolders are below the current working directory.

| Data  | Subfolder | Web access |
|---|---|---|
|  media (images, videos, ...)  | /media | `http://IP:PORT/media` |
|  config | /config | via REST-API |
|  logfiles | /log | via REST-API |
|  userdata (images, frames, fonts, ...) | /userdata | via adminpanel file explorer |
|  custom CSS to override default CSS if file exists | /userdata/private.css | `http://IP:PORT/private.css` |

## Mediaitems

The captured media (images, ...) are stored as well as cached versions of the postprocessed media to ensure short response times of the app.

The original is directly from image source and no processing was applied.
The unprocessed version (sizes small, medium large) represend the original without any filter or pipeline stages from postprocessing applied.
The processed version (sizes small, medium large) have all configured filters applied.

### v5 and later

| Item |  Subfolder | Web access |
|---|---|---|
|  original from camera  | /media/unprocessed_original | - |
|  processed L version (full)  | /media/processed_full | `/media/full/{mediaitem_id}` |
|  processed M version (preview)  | - | `/media/preview/{mediaitem_id}` |
|  processed S version (thumbnail)  | - | `/media/thumbnail/{mediaitem_id}` |

### v4 and before

| Item |  Subfolder | Web access |
|---|---|---|
|  original from camera  | /media/original | `/media/original` |
|  unprocessed L version (full)  | /media/unprocessed/full | `/media/unprocessed/full` |
|  unprocessed M version (preview)  | /media/unprocessed/preview | `/media/unprocessed/preview` |
|  unprocessed S version (small)  | /media/unprocessed/small | `/media/unprocessed/small` |
|  processed L version (full)  | /media/processed/full | `/media/processed/full` |
|  processed M version (preview)  | /media/processed/preview | `/media/processed/preview` |
|  processed S version (small)  | /media/processed/small | `/media/processed/small` |
