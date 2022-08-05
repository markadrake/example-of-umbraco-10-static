import glob from "glob";
import path from "path";
import fs from "fs";
import camelcase from "camelcase";

/*
	Clean up our JSON.
 */
const jsonFilePath = "./data/usync/";
glob(path.join(jsonFilePath, "*.json"), (error, foundFiles) => {
	// Exit: an error has occured
	if (error) {
		console.log(error);
		return;
	}

	// Clean up JSON data
	foundFiles.forEach(file => {		
		let data = JSON.parse(fs.readFileSync(file));
		data = traverse(data);
		fs.writeFileSync(file, JSON.stringify(data, null, 3));		
	});

});

function traverse(o) {

	// Traverse arrays
	if(o instanceof Array) {
		let newO = [];

		// Remove nested arrays and objects
		if(o.length == 1 && o[0].value && o[0].value.length == 1) {
			return o[0].value[0];
		}

		// Traverse array
		o.forEach((value, index) => {
			newO.push(traverse(value));
		});

		return newO;
	}

	// Traverse objects, normalize keys
	if(o instanceof Object) {
		let newO = {};

		// Normalize key
		Object.keys(o).forEach((key) => {
			newO[camelcase(key)] = traverse(o[key]);
		});

		return newO;
	}

	// Try to parse strings into JSON data
	if(typeof o === "string") {
		try {
			let newO = JSON.parse(o);
			return traverse(newO);
		} catch (e) {
			return o;
		}
	}

	return o;
}