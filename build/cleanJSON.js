const glob = require("glob"),
	path = require("path"),
	fs = require("fs");

/*
	Clean up our JSON.
 */
const jsonFilePath = "./data/";
glob(path.join(jsonFilePath, "*.json"), (error, foundFiles) => {
	// Exit: an error has occured
	if (error) {
		console.log(error);
		return;
	}

	// Clean up JSON data
	foundFiles.forEach(file => {
		var data = JSON.parse(fs.readFileSync(file));

		// Exit: no properties to act on
		const properties = data.Content.Properties[0] || null;
		let cleanProperties = {};
		if(!properties) return;

		Object.keys(properties).forEach(key => {
			try {
				cleanProperties[key] = JSON.parse(properties[key][0].Value[0]);
			} catch (e) {
				cleanProperties[key] = properties[key][0].Value[0];
			}
		});

		data.Content.Properties = cleanProperties;

		fs.writeFileSync(file, JSON.stringify(data, null, 3));
	});
});