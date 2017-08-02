module.exports = function ( grunt ) {

	// Configure tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		copy: {
			main: {
				expand: true,
				cwd: 'assets/js/',
				src: '**',
				dest: 'assets/js/__dest/',
				flatten: true,
				filter: 'isFile',
			},
		},
		uglify: {
			dev: {
				beautify: true,
				src: "assets/js/__dest/*.js",
				dest: "js/scripts.min.js"
			}
		},
		watch: {
			js: {
				files: ["assets/js/**"],
				tasks: ["copy:main","uglify:dev"]
			},
			grunt: { files: ['gruntfile.js'] },
			css: { 
				files: ['assets/css/*.css'], 
				tasks: [ "cssmin:dist" ]
			}
		},
		cssmin: {
			dist: {
				files: {
					'style.min.css': ['assets/css/*.css']
				}
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Register tasks
	grunt.registerTask("default", ["uglify:dev"]);

}