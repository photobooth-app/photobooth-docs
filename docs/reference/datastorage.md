# Data Storage

!!! info

    The photobooth-app uses the current working directory to store all data.
    All subfolders are below the current working directory. The folders are created automatically on app start.

| Data                                              | Subfolder             | Web access                   |
| ------------------------------------------------- | --------------------- | ---------------------------- |
| Original captures without any image filters applied | /media/camera_original/                | `http://IP:8000/media/camera_original/{filename}`       |
| Processed captures (filters applied) and generated images (collages) | /media/processed_full/                | `http://IP:8000/media/processed_full/{filename}`       |
| Configuration files                               | /config               | via REST-API                 |
| Log files                                         | /log                  | via REST-API                 |
| Userdata, the place to store your frames, fonts, ...  | /userdata             | via the file explorer in the admin dashboard |
| Internal database | /database             | no access |
| Cached mediaitems | /cache             | no user access |
| Custom CSS to override default CSS if file exists | /userdata/private.css | `http://IP:8000/private.css` |
