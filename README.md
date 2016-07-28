Resource Mobile
==========

Setup
-----

* bower install
* npm install
* npm install -g cordova ionic

Run
---

ionic serve
OR
ionic serve --lab
OR
ionic run android --livereload

Changes to files in the src directory will automatically be picked up.

By default, the app will connect to the production server when running on the
phone and the localhost server when running with "ionic serve". To connect to
a different server, set the SERVER_URL environment variable before running
"ionic serve" or "ionic run". For example:

export SERVER_URL=http://192.168.0.1:9900

Build only
----------

gulp

Add new typings
---------------

Install tsd: "npm install tsd -g".

Then add typings to the project like this: "tsd install jquery --save".

See https://github.com/Definitelytyped/tsd#readme

Create App
----------

ionic state reset

Then to build, emulate or run the app:
http://ionicframework.com/docs/cli/run.html

Add new Cordova plugin
----------------------

ionic plugin add cordova-plugin-<name>
