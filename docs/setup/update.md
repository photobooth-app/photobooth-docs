# Update

[![current release](https://img.shields.io/pypi/v/photobooth-app)](https://pypi.org/project/photobooth-app/)

::: info

Depending on your installation method, select the update method.

Updates are tested only from the last major version to current major (v8->v9).

Prior to an update, backup your data is highly recommended.
:::

## Backup

Backing up your data is as easy as copying the working directory of the app.
All data the app creates/uses is stored within the working directory - if you backup this directory, everything is covered.
If you installed according to the installation guide, the working directory is `~/photobooth-data/`.

On Linux you can create a backup for example with the following command:

```sh
cp -r ~/photobooth-data photobooth-data_backup_$(date +%Y-%m-%d_%H-%M-%S)
```

Or zip the photobooth-data directory:

```sh
zip -r photobooth-data_backup_$(date +%Y-%m-%d_%H-%M-%S).zip ~/photobooth-data
```

## Update with pipx

```sh
pipx upgrade photobooth-app
```

Dependencies may need to be reinstalled in some versions. If you encounter any module errors, you should use the following command to update instead.

```sh
pipx reinstall photobooth-app
```

## Upgrade in virtual environment

To upgrade to the latest release use pip:

Activate local venv before update:

```sh
source ~/photobooth-app/.venv/bin/activate
```

Start the upgrade:

```sh
pip install --upgrade photobooth-app
```

## Upgrade global

To upgrade to the latest release use pip:

```sh
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
source ~/photobooth-app/.venv/bin/activate
```

Upgrade to main-branch

```sh
pip install --upgrade --force-reinstall --no-deps git+https://github.com/photobooth-app/photobooth-app.git@main
```

Or upgrade to dev-branch

```sh
pip install --upgrade --force-reinstall --no-deps git+https://github.com/photobooth-app/photobooth-app.git@dev
```

::: info

If dependencies changed remove `--no-deps` from above commands to also update pip packages the app relies on.
:::
