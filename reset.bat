:: Only install all plugins
ionic state restore --plugins

:::: or
::cordova state restore --plugins

:::: Only remove all installed plugins
::ionic state clear -- plugins

:::: Remove all then Install all plugins in package.json
::ionic state reset -- plugins