module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //WATCH TASKS
        watch: {
            css: {
                files: ['assets/sass/*/*.scss', 'assets/sass/*.scss'],
                tasks: ['sass', 'autoprefixer', 'css_mqpacker', 'stripmq', 'cssmin','ftpush'],
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat', 'uglify','ftpush'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['assets/img/photos/dev/*.{gif,jpeg,jpg,png}'],
                tasks: ['responsive_images'],
                options: {
                    spawn: false,
                }
            }
        },

        //SCSS TO CSS, AUTO PREFIXER, MEDIA QUERIES TO ONE, IE STYLESHEET & MINIFY
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/css/style.css': 'assets/sass/style.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 4 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'assets/css/style.css',
                dest: 'assets/css/'
            }
        },
        css_mqpacker: {
            options: {
                map: false
            },
            main: {
                expand: true,
                cwd: 'assets/css/',
                src: 'style.css',
                dest: 'assets/css/'
            }
        },
        stripmq: {
            options: {
                width: '65em',
                type: 'screen'
            },
            all: {
                files: {
                    'assets/css/style-ie.css': ['assets/css/style.css']
                }
            }
        },
        remfallback: {
            your_target: {
                options: {
                    log: false,
                    replace: false
                },
                files: {
                    'assets/css/style-ie.min.css': ['assets/css/style-ie.css']
                }
            },
        },
        cssmin: {
            main: {
                expand: true,
                cwd: 'assets/css/',
                src: '*.css',
                dest: 'assets/build/css/',
                ext: '.min.css'
            }
        },

        //COMBINE JS & MINIFY
        concat: {
            dist: {
                src: [
                    'assets/js/plugin/*.js',
                    'assets/js/module/*.js',
                    'assets/js/component/*.js',
                    'assets/js/*.js'
                ],
                dest: 'assets/build/js/script.min.js'
            }
        },
        uglify: {
            build: {
                src: 'assets/build/js/script.min.js',
                dest: 'assets/build/js/script.min.js'
            }
        },

/*


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
*/
        //RESPONSIVE IMAGE, IMAGEOPTIM & SVGMIN
        responsive_images: {
            options: {
                engine: 'gm',
                rename: true,
                aspectRatio: true,
                gravity: 'center',
                upscale: true,
                separator: '--',
                quality: 50,

                sizes: [{
                    name: 'small',
                    width: 450
                },{
                    name: 'small',
                    width: 675,
                    suffix: '_x2'
                },{
                    name: 'medium',
                    width: 900
                },{
                    name: 'medium',
                    width: 1350,
                    suffix: '_x2'
                },{
                    name: 'large',
                    width: 1200
                },{
                    name: 'large',
                    width: 1800,
                    suffix: '_x2'
                }]
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/photos/dev/',
                    src: ['*.{gif,jpg,png}'],
                    custom_dest: 'assets/img/photos/production/{%= width %}/'
                }]
            }
        },
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: false
                },
                src: ['assets/img/photos/production/**/*.{png,gif,jpg}']
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

        'ftpush': {
            build: {
                auth: {
                    host: '176.74.18.115',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/build',
                dest: '/dev.bishops.co.uk/assets',
                exclusions: [''],
                keep: ['']
            }
        }

        /*iconizr: {
            options: {
                dims: true,
                common: 'icon',
                keep: false,
                preview: 'preview',
                padding: 1,
                render: {
                    css: false,
                    less: 'assets/scss/components'
                }
            },
            your_target: {
                src: 'assets/img/icons/svg',
                dest: 'assets/img/icons'
            }
        }*/

        
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-css-mqpacker');
    grunt.loadNpmTasks('grunt-stripmq');
    grunt.loadNpmTasks('grunt-remfallback');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-svgmin');
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftpush');


    grunt.registerTask('dev', [
        'css',
        'js',
        'watch'
    ]);

    grunt.registerTask('build', [
        'css',
        'js'
    ]);

    grunt.registerTask('css', [
        'sass', 
        'autoprefixer', 
        'css_mqpacker', 
        'stripmq', 
        'remfallback', 
        'cssmin'
    ]);

    grunt.registerTask('js', [
        'concat',
        'uglify'
    ]);


    grunt.registerTask('images', [
        'responsive_images',
        'svgmin',
        'imageoptim'
    ]);

    grunt.registerTask('deploy', 'ftpush:build');

};