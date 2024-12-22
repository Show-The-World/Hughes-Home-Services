const {DateTime} = require('luxon');

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy({"src/styles/": "styles/"})
  	eleventyConfig.addPassthroughCopy({"src/assets/": "assets/"})
  
	eleventyConfig.addPassthroughCopy({"src/other/robot.txt": "/robot.txt"})
 
	eleventyConfig.addPassthroughCopy({"src/pages/admin/config.yml": "admin/config.yml"})

	eleventyConfig.addFilter("postDate", (dateObj) =>{
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
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