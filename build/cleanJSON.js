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
	let i = 0;
	foundFiles.forEach(file => {		
		if (i) return;
		i++;

		let data = JSON.parse(fs.readFileSync(file));
		data = traverse(data);
		fs.writeFileSync(file, JSON.stringify(data, null, 3));		
	});

});

function traverse(o) {

	// Traverse arrays
	if(o instanceof Array) {
		let newO = [];

		o.forEach((value, index) => {
			newO.push(traverse(value));
		});

		return newO;
	}

	// Traverse objects, normalize keys
	if(o instanceof Object) {
		let newO = {};

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