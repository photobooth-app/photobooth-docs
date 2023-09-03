
# Update

## Update photobooth app from PyPi

Check the  [changelog](https://github.com/mgrl/photobooth-app/blob/main/CHANGELOG.md) for breaking changes and new features.
To upgrade to the latest release use pip:

```zsh
pip install --upgrade photobooth-app
```

Afterwards restart the photobooth.
If the app doesn't show up again, check the [troubleshooting](../support/troubleshooting.md) page.

## Update to development versions

Stable releases are published at [PyPI registry](https://pypi.org/project/photobooth-app/) usually.
To test the latest development version update directly from git:

```sh
# upgrade to main-branch
pip install --upgrade --force-reinstall --no-deps git+https://github.com/mgrl/photobooth-app.git@main

# or upgrade to dev-branch
pip install --upgrade --force-reinstall --no-deps git+https://github.com/mgrl/photobooth-app.git@dev
```

!!! info
    If dependencies changed remove `--no-deps` from above commands to also update pip packages the app relies on.
