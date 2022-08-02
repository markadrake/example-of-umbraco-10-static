const { readdirSync, rmSync } = require("fs"),
	path = require("path");

/* 
	Clean the data directory
*/
const dataPath = path.resolve("./data");
readdirSync(dataPath).forEach(f => rmSync(`${dataPath}/${f}`));
