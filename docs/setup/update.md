
# Update

!!! info
    Depending on your installation method, choose the update method.

## Method A: Update with pipx

```zsh
pipx upgrade photobooth-app
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
If the app doesn't show up again, check the [troubleshooting](../support/troubleshooting.md) page.

## Update to development versions

Stable releases are published at [PyPI registry](https://pypi.org/project/photobooth-app/) usually. Update to development versions only if requested or you know what you do.

To test the latest development version update directly from git:

Example if installed via pip or pipx

```sh
pip install --force git+https://github.com/photobooth-app/photobooth-app.git@main
```

```sh
pipx upgrade git+https://github.com/photobooth-app/photobooth-app.git@main
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
