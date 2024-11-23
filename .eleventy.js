module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy({"src/styles/": "styles/"})
  	eleventyConfig.addPassthroughCopy({"src/assets/": "assets/"})
  
	eleventyConfig.addPassthroughCopy({"src/other/robot.txt": "/robot.txt"})

  
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