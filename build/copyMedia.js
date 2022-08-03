const glob = require("glob"),
	path = require("path"),
	fs = require("fs"),
	sharp = require("sharp");

/*
	Copy our media
 */
const mediaPath = "../src/umbraco-cms/wwwroot/media/";
glob(path.join(mediaPath, "**/*.*"), (error, images) => {
	// Exit: an error has occured
	if (error) {
		console.log(error);
		return;
	}

	// Resize our images
	var image = sharp(images[0]);

	imageCrops.forEach(crop => {
		console.log(crop);

		var i = image.clone().resize({
			width: crop.width,
			height: crop.height,
			fit: crop.fit
		});

		var filename = `./data/media/${crop.alias}`;

		i.clone()
			.toFormat("jpg")
			.toFile(`${filename}.jpg`);

		i.clone()
			.toFormat("png")
			.toFile(`${filename}.png`);

		i.clone()
			.toFormat("webp")
			.toFile(`${filename}.webp`);

	});

});

/*
	Configuration
*/
var imageCrops = [
	{
		alias: "xl",
		width: 1000,
		height: 1000,
		fit: "cover"
	},
	{
		alias: "l",
		width: 800,
		height: 800,
		fit: "cover"
	},
	{
		alias: "m",
		width: 600,
		height: 600,
		fit: "cover"
	},
	{
		alias: "s",
		width: 400,
		height: 400,
		fit: "cover"
	},
	{
		alias: "xs",
		width: 200,
		height: 200,
		fit: "cover"
	}
];