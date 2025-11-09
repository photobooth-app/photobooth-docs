# Plugins

The photobooth-app backend can be extended by plugins since version 6.

!!! note
This page is a guide and documentation on how to develop a plugin. The use of the included plugins is not decribed here but [in the setup section](../setup/index.md).

    If you want to develop plugins you need python skills. The support to develop plugins is quite limited but feel free to ask questions in the Github discussions.

## Plugins Built-In

There are some plugins built in and can be used as reference to build your own plugins:

- [GPIO](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/gpio_lights) to control lights or other devices via GPIO
- [WLED](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/wled) signaling countdown, capture and recording
- [pilgram2 filter](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/filter_pilgram2) apply color filter in post processing
- [commander](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/commander) hook http requests and commands to events
- [synchronizer](https://github.com/photobooth-app/photobooth-app/tree/main/src/photobooth/plugins/synchronizer) copy media files to local filesystem or remote FTP/Nextcloud servers to backup and share

## Plugin Architecture

Plugins listen to [event-hooks](https://github.com/photobooth-app/photobooth-app/blob/main/src/photobooth/plugins/__init__.py) triggered by the [pluggy](https://pluggy.readthedocs.io/en/latest/) package.

```text title="Basic folder structure for a plugin" hl_lines="4-6"
- photobooth-data (working directory)
  - plugins
    - plugin_name              <-\
        - __init__.py (empty)     |   same name
        - plugin_name.py       <-/
        - config.py (optional)
```

### Available hooks

Plugins can register to hooks, so called [hookspecs](https://github.com/photobooth-app/photobooth-app/blob/main/src/photobooth/plugins/__init__.py). The hookspecs are categorized currently as follows:

- `PluginManagementSpec`: Start and Stop the Plugin during app startup/shutdown
- `PluginStatemachineSpec`: Hooks triggered during actions like countdown start, capture, finished, ...
- `PluginAcquisitionSpec`: Hooks directly triggered by the backends when a capture is triggered and capture is done.
- `PluginMediaprocessingSpec`: Hooks triggered for post processing images to apply filter.

## Plugin Skeleton

In this very basic example the plugin only prints to the console during app startup:

```python title="plugin_name.py"
import logging
from photobooth.plugins import hookimpl
from photobooth.plugins.base_plugin import BasePlugin
from .config import PluginNameConfig    # if the plugin shall have a config, create the config.py file and import here

logger = logging.getLogger(__name__) # use to emit log messages

# NOTE: name the class following to the folder name -> plugin_name will require the class to be PluginName
class PluginName(BasePlugin[PluginNameConfig]):
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

## Filter Plugin Skeleton

The filters drawer can be extended by plugins since v6. Check following example for a basic understanding,
also have a look at the integrated pilgram2 filter for reference.

Most of the file below is boilerplate, the relevant functions to modify and hook your filter are `mp_filter_pipeline_step` and `do_filter`.

```python title="plugin_filter.py"
import logging
from typing import cast, get_args

from PIL import Image, ImageFilter

from photobooth.plugins import hookimpl
from photobooth.plugins.base_plugin import BaseFilter

from .config import FilterStableConfig, available_filter

logger = logging.getLogger(__name__)

# NOTE: name the class following to the folder name -> plugin_filter will require the class to be PluginFilter
class PluginFilter(BaseFilter[FilterStableConfig]):
    def __init__(self):
        super().__init__()

        self._config: FilterStableConfig = FilterStableConfig()

    @hookimpl
    def mp_avail_filter(self) -> list[str]:
        return [self.unify(f) for f in get_args(available_filter)]

    @hookimpl
    def mp_userselectable_filter(self) -> list[str]:
        if self._config.add_userselectable_filter:
            return [self.unify(f) for f in self._config.userselectable_filter]
        else:
            return []

    @hookimpl
    def mp_filter_pipeline_step(self, image: Image.Image, plugin_filter: str, preview: bool) -> Image.Image | None:
        filter = self.deunify(plugin_filter)

        if filter:  # if anything, then filter, else for None this plugin is not requested, leave.
            return self.do_filter(image, cast(available_filter, filter))

    def do_filter(self, image: Image.Image, config_filter: available_filter) -> Image.Image:
        filter = getattr(ImageFilter, config_filter)
        filtered_image = image.filter(filter=filter)

        return filtered_image

```

The configuration consists of a class and one bool variable to enable the plugin.

```python title="config.py"
import typing

from pydantic import Field
from pydantic_settings import SettingsConfigDict

from photobooth import CONFIG_PATH
from photobooth.services.config.baseconfig import BaseConfig

available_filter = typing.Literal[
    "CONTOUR",
    "FIND_EDGES",
    "EMBOSS",
]


class FilterStableConfig(BaseConfig):
    model_config = SettingsConfigDict(title="Filter Plugin Config", json_file=f"{CONFIG_PATH}plugin_filter_example.json")

    add_userselectable_filter: bool = Field(
        default=True,
        description="Add userselectable filter to the list the user can choose from.",
    )
    userselectable_filter: list[available_filter] = Field(
        default=[f for f in typing.get_args(available_filter)],
        description="Select filter, the user can choose from. Even if unselected here, the filter is still available in the admin configuration.",
    )

    # ... add more configuration here...
```

## Publish Plugins

Functionality not tested yet.
Basically you can package the plugin and use the entry group 'photobooth.plugins' which is scanned during photobooth-app startup. If the plugin is detected, it will be used.
