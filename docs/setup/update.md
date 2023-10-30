
# Update

!!! info
    Depending on your installation method, choose the update method.

## Method A: Update with pipx

```zsh
pipx upgrade photobooth-app
```

## Method B: Virtual environment pip upgrade

To upgrade to the latest release use pip:

```zsh
# activate local venv before update
source ~/photobooth-app/myenv/bin/activate

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

```sh
# example if installed via pipx
pip upgrade git+https://github.com/photobooth-app/photobooth-app.git@main

# activate local venv before update if installed in venv
source ~/photobooth-app/myenv/bin/activate

# upgrade to main-branch
pip install --upgrade --force-reinstall --no-deps git+https://github.com/photobooth-app/photobooth-app.git@main

# or upgrade to dev-branch
pip install --upgrade --force-reinstall --no-deps git+https://github.com/photobooth-app/photobooth-app.git@dev
```

!!! info
    If dependencies changed remove `--no-deps` from above commands to also update pip packages the app relies on.
