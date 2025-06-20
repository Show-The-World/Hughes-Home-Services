const {eleventyImageTransformPlugin} = require('@11ty/eleventy-img');

const {DateTime} = require('luxon');
const path = require('path');
const fs = require('fs');
const sizeOf = require("image-size")

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy({"src/styles/": "styles/"})
  	eleventyConfig.addPassthroughCopy({"src/pages/assets/graphics/": "graphics/"})
  	eleventyConfig.addPassthroughCopy({"src/pages/assets/fonts/": "fonts/"})
  
	eleventyConfig.addPassthroughCopy({"src/other/robot.txt": "/robot.txt"})
 
	eleventyConfig.addPassthroughCopy({"src/pages/admin/config.yml": "admin/config.yml"})

	eleventyConfig.addFilter("postDate", (dateObj) =>{
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
	})
	
	// Custom slice filter
	eleventyConfig.addFilter('slice', (array, start, end) => {
		if (!Array.isArray(array)) {
			throw new Error('The input to the slice filter must be an array.');
		}
		return array.slice(start, end);
	});

	eleventyConfig.addCollection("galleryImages", function () {
		const assetsGallerySrc = "/assets/gallery/"
		const galleryDir = path.join("./src/pages/", assetsGallerySrc);
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


	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		filenameFormat : function(id, src, width, format, options) {
			return `${path.basename(src).split('.')[0]}-${width}w.${format}`
		},
		formats: ['auto'],
		// widths: ['auto'],
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
		},
		sharpJpegOptions: {
			quality: 65, // lower = smaller file
			mozjpeg: true // better compression
		},
		sharpPngOptions: {
			compressionLevel: 8, // 0–9 (higher = more compression)
			quality: 70,         // 0–100 (only affects palette-based PNGs)
			palette: true        // enables 8-bit palette for smaller file size (can cause banding)
		},
		
	})
	

  
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