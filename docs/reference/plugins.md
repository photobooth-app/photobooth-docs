# Plugins

The photobooth-app backend can be extended by plugins since version 6.

## Plugins Built-In

There are some plugins built in and can be used as reference to build your own plugins:

- [GPIO](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/gpio_lights) to control light
- [WLED](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/wled) signaling countdown, capture and recording

## Plugin Architecture

Plugins listen to [event-hooks](https://github.com/photobooth-app/photobooth-app/blob/main/src/photobooth/plugins/hookspecs.py) triggered by the [pluggy](https://pluggy.readthedocs.io/en/latest/) package.

### Hooks

## Develop Plugins

```text title="Folder structure"
- plugins
  - plugin_name
    - __init__.py
    - plugin_name.py
    - config.py (optional)
```

```python title="__init__.py"
from .plugin_name import PluginName

__all__ = ["PluginName"]
```

```python title="plugin_name.py"
from photobooth.plugins import hookimpl
from .config import PluginNameConfig

class PluginName:
    def __init__(self):
        super().__init__()

        self._config: PluginNameConfig = PluginNameConfig()

    @hookimpl
    def start(self):
        print("Message is printed when enabled in config!")
```

```python title="config.py"
from pydantic import Field
from pydantic_settings import SettingsConfigDict

from photobooth import CONFIG_PATH
from photobooth.services.config.baseconfig import BaseConfig


class PluginNameConfig(BaseConfig):
    model_config = SettingsConfigDict(title="PluginName Config", json_file=f"{CONFIG_PATH}plugin_pluginname.json")

    plugin_enabled: bool = Field(
        default=False,
        description="Enable to start the plugin with app startup",
    )
```

## Publish Plugins

Functionality not tested yet.
Basically you can package the plugin and use the entry group 'photobooth.plugins' which is scanned during photobooth-app startup. If the plugin is detected, it will be used.
