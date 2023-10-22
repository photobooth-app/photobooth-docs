# Directories

!!! info
    Photobooth uses the current working directory to store all data.

    All subfolders are below the current working directory.

| Data  | Subfolder | Web access |
|---|---|---|
|  media (images, videos, ...)  | /media | `http://IP:PORT/media` |
|  logfiles | /log | via REST-API |
|  user data (images, frames, fonts, ...) | /userdata | via adminpanel file explorer |
|  config | /config | via REST-API |

## Mediaitems

The captured media (images, ...) are stored as well as cached versions of the postprocessed media to ensure short response times of the app.

The original is directly from image source and no processing was applied.
The unprocessed version (sizes small, medium large) represend the original without any filter or pipeline stages from postprocessing applied.
The processed version (sizes small, medium large) have all configured filters applied.

| Item |  Subfolder | Web access |
|---|---|---|
|  original from camera  | /media/original | `/media/original` |
|  unprocessed L version (full)  | /media/unprocessed/full | `/media/unprocessed/full` |
|  unprocessed M version (preview)  | /media/unprocessed/preview | `/media/unprocessed/preview` |
|  unprocessed S version (small)  | /media/unprocessed/small | `/media/unprocessed/small` |
|  processed L version (full)  | /media/processed/full | `/media/processed/full` |
|  processed M version (preview)  | /media/processed/preview | `/media/processed/preview` |
|  processed S version (small)  | /media/processed/small | `/media/processed/small` |
