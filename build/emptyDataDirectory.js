const { readdirSync, rmSync } = require("fs");

/* 
	Clean the data directory
*/
const dataPath = path.resolve("./data");
readdirSync(dataPath).forEach(f => rmSync(`${dataPath}/${f}`));
