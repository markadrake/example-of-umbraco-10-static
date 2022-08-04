import glob from "glob";
import xml2js from "xml2js";
import path from "path";
import { readFileSync, writeFileSync, mkdir, readdirSync, rmSync, mkdirSync, readFile } from "fs";

const parseString = xml2js.parseString;

/*
	Find all uSync content on disk, and parse it into JSON.
*/
const uSyncFilePath = "../src/umbraco-cms/uSync/v9";

glob(path.join(uSyncFilePath, "**/*.config"), (error, foundFiles) => {
	// Exit: an error has occured
	if (error) {
		console.log(error);
		return;
	}

	// Transform each file from XML to JSON	
	foundFiles.forEach(file => {
		parseString(readFileSync(file), function (err, result) {
			let filename = "";

			if(result.Content) {
				filename = `${result.Content.$.Key}.json`;
				writeFileSync(`./data/usync/${filename}`, JSON.stringify(result.Content, null, 3));
			}

			// if(result.DataType) {
			// 	filename = `${result.DataType.$.Key}.json`;
			// 	writeFileSync(`./data/usync/${filename}`, JSON.stringify(result.DataType, null, 3));
			// }

			// if(result.Language) {
			// 	filename = `${result.Language.$.Key}.json`;
			// 	writeFileSync(`./data/usync/${filename}`, JSON.stringify(result.Language, null, 3));
			// }

			// if(result.Media) {
			// 	filename = `${result.Media.$.Key}.json`;
			// 	writeFileSync(`./data/usync/${filename}`, JSON.stringify(result.Media, null, 3));
			// }

			// if(result.MediaType) {
			// 	filename = `${result.MediaType.$.Key}.json`;
			// 	writeFileSync(`./data/usync/${filename}`, JSON.stringify(result.MediaType, null, 3));
			// }

			// if(result.Template) {
			// 	filename = `${result.Template.$.Key}.json`;
			// 	writeFileSync(`./data/usync/${filename}`, JSON.stringify(result.Template, null, 3));
			// }
		});
	});
});
