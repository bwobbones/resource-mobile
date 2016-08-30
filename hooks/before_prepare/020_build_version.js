#!/usr/bin/env node

// This plugin replaces text in a file with the app version from config.xml.

var wwwFileToReplace = "config.xml";

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

function loadConfigXMLDoc(filePath) {
    var fs = require('fs');
    var xml2js = require('xml2js');
    var json = "";
    try {
        var fileData = fs.readFileSync(filePath, 'ascii');
        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result;
        });
        console.log("File '" + filePath + "' was successfully read.");
        return json;
    } catch (ex) {
        console.log(ex)
    }
}

function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}

var configXMLPath = "config.xml";
var rawJSON = loadConfigXMLDoc(configXMLPath);
var version = rawJSON.widget.version + "." + (process.env.BUILD_NUMBER || "0");
console.log("Version: ", version);

var rootdir = process.argv[2];

var currentBuildPlatforms = process.env.CORDOVA_PLATFORMS.split(",");
console.log("Current build platforms: ", currentBuildPlatforms);

if (rootdir) {
	var fullfilename = path.join(rootdir, wwwFileToReplace);
	if (fs.existsSync(fullfilename)) {
		replace_string_in_file(fullfilename, "%%VERSION%%", version);
		console.log("Replaced version in file: " + fullfilename);
	}
}
