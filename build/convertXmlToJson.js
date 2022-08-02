const glob = require("glob"),
	xml2js = require("xml2js"),
	path = require("path"),
	{ readFileSync, writeFileSync, readdirSync, rmSync } = require("fs");

const parseString = xml2js.parseString;

/*
	Find all uSync content on disk, and parse it into JSON.
*/
const uSyncFilePath = "../src/umbraco-cms/uSync/v9";
const uSyncContentPath = "/content";

glob(path.join(uSyncFilePath, uSyncContentPath, "*.config"), (error, foundFiles) => {
	// Exit: an error has occured
	if (error) {
		console.log(error);
		return;
	}

	// Transform each file from XML to JSON
	foundFiles.forEach(file => {
		parseString(readFileSync(file), function (err, result) {
			let filename = path.basename(file, path.extname(file));
			writeFileSync(`./data/${filename}.json`, JSON.stringify(result, null, 3));
		});
	});
});
