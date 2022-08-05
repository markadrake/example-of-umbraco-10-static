import glob from "glob";
import path from "path";
import fs from "fs";
import camelcase from "camelcase";
import handlebars from "handlebars";

/*
	Cycle through JSON data to generate HTML documents.
*/
const jsonContentPath = "./data/usync/";
glob(path.join(jsonContentPath, "*.json"), (error, foundFiles) => {

	// Exit: an error has occured
	if (error) {
		console.log(error);
		return;
	}

	// Load the handlebars template
	const template = handlebars.compile(fs.readFileSync("./../src/website/template.html", { encoding: "utf8" }));

	// Generate HTML documents.
	foundFiles.forEach(file => {		
		const data = JSON.parse(fs.readFileSync(file, { encoding: "utf8" })),
			html = template(data);

		fs.writeFileSync(`./website/${camelcase(data.$.alias)}.html`, html);
	});

});
