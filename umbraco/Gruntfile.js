module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //WATCH TASKS
        watch: {
            css: {
                files: ['assets/less/*/*.less'],
                tasks: ['less', 'autoprefixer', 'css_mqpacker', 'stripmq', 'rem_to_px', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: ['assets/js/*/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            }
        },

        //LESS TO CSS, AUTO PREFIXER, MEDIA QUERIES TO ONE, IE STYLESHEET & MINIFY
        less: {
            development: {
                options: {
                    paths: ['assets/less']
                },
                files: {
                    'assets/css/dev/style.css': 'assets/less/style.less'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'assets/css/dev/style.css',
                dest: 'assets/css/dev/'
            }
        },
        css_mqpacker: {
            options: {
                map: false
            },
            main: {
                expand: true,
                cwd: 'assets/css/dev/',
                src: 'style.css',
                dest: 'assets/css/dev/'
            }
        },
        stripmq: {
            options: {
                width: '65em',
                type: 'screen'
            },
            all: {
                files: {
                    'assets/css/production/style-ie.min.css': ['assets/css/dev/style.css']
                }
            }
        },
		rem_to_px: {
			options: {
				baseFontSize: 10,
				removeFontFace: true,
			},
			dist: {
				src: ['assets/css/production/style-ie.min.css'],
		        dest: 'assets/css/production/norem/'
			}
		},
        cssmin: {
            main: {
                expand: true,
                cwd: 'assets/css/dev/',
                src: 'style.css',
                dest: 'assets/css/production',
                ext: '.min.css'
            }
        },

        //COMBINE JS & MINIFY
        concat: {
            dist: {
                src: ['assets/js/dev/*.js'],
                dest: 'assets/js/production/combined.js'
            }
        },
        uglify: {
            build: {
                src: 'assets/js/production/combined.js',
                dest: 'assets/js/production/script.min.js'
            }
        },

        //IMAGEOPTIM & SVGMIN
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: false
                },
                src: ['assets/img/*.{png,gif,jpg}']
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {removeViewBox: true}, 
                    {removeUselessStrokeAndFill: false},
                    {removeEmptyAttrs: false}
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: '*.svg',
                    dest: 'assets/img/',
                    ext: '.svg'
                }]
            }
        },

        //BROWSER SYNC
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['assets/css/production/*.css', 'assets/js/production/*.js', '*.php']
                },
                options: {
                    watchTask: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-css-mqpacker');
    grunt.loadNpmTasks('grunt-stripmq');
    grunt.loadNpmTasks('grunt-rem-to-pixels');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-svgmin');
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['less', 'autoprefixer', 'css_mqpacker', 'stripmq', 'rem_to_px', 'cssmin', 'concat', 'uglify', 'browserSync', 'watch']);
    grunt.registerTask('images', ['imageoptim'], ['svgmin']);
    
    grunt.registerTask('mq', ['stripmq']);

};