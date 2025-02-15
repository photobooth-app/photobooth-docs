# Plugins

The photobooth-app backend can be extended by plugins since version 6.

## Plugins Built-In

There are some plugins built in and can be used as reference to build your own plugins:

- [GPIO](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/gpio_lights) to control light
- [WLED](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/wled) signaling countdown, capture and recording

## Plugin Architecture

Plugins listen to [event-hooks](https://github.com/photobooth-app/photobooth-app/blob/main/src/photobooth/plugins/hookspecs.py) triggered by the [pluggy](https://pluggy.readthedocs.io/en/latest/) package.

## Basic Plugin Skeleton

```text title="Basic folder structure for a plugin" hl_lines="4-6"
- photobooth-data (working directory)
  - plugins
    - plugin_name            <-\
        - __init__.py           |   same name
        - plugin_name.py     <-/
        - config.py (optional)
```

```python title="__init__.py"
# empty __init__.py file to declare folder as a package.
```

In this very basic example the plugin only prints to the console during app startup:

```python title="plugin_name.py"
from photobooth.plugins import hookimpl 
from .config import PluginNameConfig    # if the plugin shall have a config, create the config.py file and import here

class PluginName:
    def __init__(self):
        super().__init__()

        # when this _config is present, the plugin manager detects it and adds the configuration to the admin dashboard
        self._config: PluginNameConfig = PluginNameConfig()

    @hookimpl # mark a function as hook implementation, check the hookspec for available hooks
    def start(self):
        if self._config.plugin_enabled:
            print("Message is printed when enabled in config!")
        else:
            print("Message is printed when not enabled in config!")
```

The configuration consists of a class and one bool variable to enable the plugin.

```python title="config.py"
from pydantic import Field
from pydantic_settings import SettingsConfigDict

from photobooth import CONFIG_PATH
from photobooth.services.config.baseconfig import BaseConfig


class PluginNameConfig(BaseConfig):
    # The plugin uses pydantic-settings to store settings.
    model_config = SettingsConfigDict(title="PluginName Config", json_file=f"{CONFIG_PATH}plugin_pluginname.json")

    plugin_enabled: bool = Field(
        default=False,
        description="Enable to start the plugin with app startup",
    )
    # ... add more configuration here...
```

### Hooks available

The [hookspecs](https://github.com/photobooth-app/photobooth-app/blob/main/src/photobooth/plugins/hookspecs.py) are categorized currently as follows:

- ``PluginManagementSpec``: Start and Stop the Plugin during app startup/shutdown
- ``PluginStatemachineSpec``: Hooks triggered during actions like countdown start, capture, finished, ...
- ``PluginAcquisitionSpec``: Hooks directly triggered by the backends when a capture is triggered and capture is done.

## Publish Plugins

Functionality not tested yet.
Basically you can package the plugin and use the entry group 'photobooth.plugins' which is scanned during photobooth-app startup. If the plugin is detected, it will be used.
