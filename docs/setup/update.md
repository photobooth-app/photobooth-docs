
# Update

!!! info
    Depending on your installation method, select the update method.
    Prior to an update, it is good practice to backup your data.

## Backup

Backing up your data is as easy as copying the working directory of the app.
All data the app creates/uses is stored within the working directory - if you backup this directory, everything is covered.
If you installed according to the installation guide, the working directory is `~/photobooth-data/`.

On Linux you can create a backup for example with the following command:

```zsh
cp -r ~/photobooth-data photobooth-data_backup_$(date +%Y-%m-%d_%H-%M-%S)
```

Or zip the photobooth-data directory:

```zsh
zip -r photobooth-data_backup_$(date +%Y-%m-%d_%H-%M-%S).zip ~/photobooth-data
```

## Method A: Update with pipx

```zsh
pipx upgrade --include-deps photobooth-app
```

## Method B: Virtual environment pip upgrade

To upgrade to the latest release use pip:

Activate local venv before update:

```zsh
source ~/photobooth-app/myenv/bin/activate
```

Start the upgrade:

```zsh
pip install --upgrade photobooth-app
```

## Method C: Global pip upgrade

To upgrade to the latest release use pip:

```zsh
pip install --upgrade photobooth-app
```

Afterwards restart the photobooth.
If the app doesn't show up again, check the [troubleshooting](../help/troubleshooting.md) page.

## Update to development versions

Stable releases are published at [PyPI registry](https://pypi.org/project/photobooth-app/) usually. Update to development versions only if requested or you know what you do.

To test the latest development version update directly from git:

Example if installed via pip or pipx

```sh
pip install --force git+https://github.com/photobooth-app/photobooth-app.git@main
```

```sh
pipx install --force --system-site-packages git+https://github.com/photobooth-app/photobooth-app.git@main
```

Or to install a specific version using pipx:

```sh
pipx inject photobooth-app photobooth-app==2.0.7
```

Or activate local venv before update if installed in venv

```sh
source ~/photobooth-app/myenv/bin/activate
```

Upgrade to main-branch

```sh
pip install --upgrade --force-reinstall --no-deps git+https://github.com/photobooth-app/photobooth-app.git@main
```

Or upgrade to dev-branch

```sh
pip install --upgrade --force-reinstall --no-deps git+https://github.com/photobooth-app/photobooth-app.git@dev
```

!!! info
    If dependencies changed remove `--no-deps` from above commands to also update pip packages the app relies on.
