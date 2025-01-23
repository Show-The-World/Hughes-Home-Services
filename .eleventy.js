const {DateTime} = require('luxon');
const path = require('path');
const fs = require('fs');
const sizeOf = require("image-size")

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy({"src/styles/": "styles/"})
  	eleventyConfig.addPassthroughCopy({"src/assets/": "assets/"})
  
	eleventyConfig.addPassthroughCopy({"src/other/robot.txt": "/robot.txt"})
 
	eleventyConfig.addPassthroughCopy({"src/pages/admin/config.yml": "admin/config.yml"})

	eleventyConfig.addFilter("postDate", (dateObj) =>{
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
	})
	

	eleventyConfig.addCollection("galleryImages", function () {
		const assetsGallerySrc = "/assets/gallery/"
		const galleryDir = path.join("./src/", assetsGallerySrc);
		return fs.readdirSync(galleryDir)
		  .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file)) // Filter image files
		  .map(file => {
			const filePath = path.join(galleryDir, file);
			const dimensions = sizeOf(filePath); // Get dimensions of the image
			return {
				name: file,
				path: path.join(assetsGallerySrc, file),
				width: dimensions.width,
				height: dimensions.height,
			};
		});
	});
	
  
	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',

		dir: {
			input: 'src/pages',
			includes: "../_includes",
      		data: "../_data",
			output: 'public',
		}
	};
};