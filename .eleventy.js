module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy({"src/styles/": "styles/"})
  	eleventyConfig.addPassthroughCopy({"src/assets/": "assets/"})
  
	eleventyConfig.addPassthroughCopy({"src/other/robot.txt": "/robot.txt"})

  
	// Check if we're in development mode
	if(process.env.NODE_ENV === 'production') {
		// Add a directory of development-only pages
    	eleventyConfig.ignores.add('src/dev/')
	}
	if(process.env.NODE_ENV === 'development'){
		eleventyConfig.addPassthroughCopy({"src/dev/assets": "dev/assets/"})
	}


	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',

		dir: {
			input: 'src',
			output: 'public',
		}
	};
};