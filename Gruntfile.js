module.exports = function (grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            /* Development and production paths */
            paths: {
                config: 'config.js',
                src: {
                    adminLTE: 'assets/template/AdminLTE2'
                },
                dest: {
                    base: 'dist',
                    js: 'dist/js/app.js',
                    jsMin: 'dist/js/app-v<%= pkg.version %>.min.js',
                    css: 'dist/css/app.css',
                    cssMin: 'dist/css/app-v<%= pkg.version %>.min.css',
                    tmpl: 'dist/js/templates.js',
                    index: 'dist/index-full.html',
                    indexMin: 'dist/index.html',
                    vendor: 'dist/vendor',
                    adminLTE: 'dist/vendor/adminLTE',
                    bower: 'dist/vendor/scripts',
                }
            },

            jshint: {
                all: [
                    'app/**/*.js'
                ], options: {
                    reporter: require('jshint-stylish'),
                    undef: true,
                    globals: {
                        angular: true,
                        swal: true,
                        moment: true,
                        _: true,
                        Blob: true,
                        URL: true,
                        $: true
                    }
                }
            },

            /* Cleans the dist folder*/
            clean: {
                build: ['dist'],
                temp: ['<%= paths.dest.js %>', '<%= paths.dest.css %>', '<%= paths.dest.tmpl %>'],
                index: ['<%= paths.dest.index %>']
            },

            /* Copies template dependences and*/
            copy: {
                main: {
                    files: [
                        //Template dependences
                        {
                            src: ['<%= paths.src.adminLTE %>/bootstrap/css/bootstrap.min.css'],
                            dest: '<%= paths.dest.adminLTE %>/bootstrap/css/bootstrap.min.css'
                        },
                        {
                            expand: true,
                            cwd: '<%= paths.src.adminLTE %>/bootstrap/fonts/',
                            src: ['**'],
                            dest: '<%= paths.dest.adminLTE %>/bootstrap/fonts/'
                        },
                        {
                            expand: true,
                            cwd: 'assets/images/',
                            src: ['**'],
                            dest: 'dist/assets/images/'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/dist/css/AdminLTE.min.css'],
                            dest: '<%= paths.dest.adminLTE %>/dist/css/AdminLTE.min.css'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/dist/css/skins/skin-blue.min.css'],
                            dest: '<%= paths.dest.adminLTE %>/dist/css/skins/skin-blue.min.css'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/iCheck/flat/blue.css'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/iCheck/flat/blue.css'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/datepicker/datepicker3.css'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/datepicker/datepicker3.css'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/jQuery/jQuery-2.1.4.min.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/jQuery/jQuery-2.1.4.min.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/jQueryUI/jquery-ui.min.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/jQueryUI/jquery-ui.min.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/bootstrap/js/bootstrap.min.js'],
                            dest: '<%= paths.dest.adminLTE %>/bootstrap/js/bootstrap.min.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/datepicker/bootstrap-datepicker.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/datepicker/bootstrap-datepicker.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/slimScroll/jquery.slimscroll.min.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/slimScroll/jquery.slimscroll.min.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/fastclick/fastclick.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/fastclick/fastclick.js'
                        },
                        {
                            src: ['<%= paths.src.adminLTE %>/plugins/iCheck/icheck.min.js'],
                            dest: '<%= paths.dest.adminLTE %>/plugins/iCheck/icheck.min.js'
                        },
                        {
                            src: ['<%= paths.config %>'],
                            dest: '<%= paths.dest.base %>/<%= paths.config %>'
                        }
                    ],
                },
            },

            ngtemplates: {
                app: {
                    src: 'app/**/*.html',
                    dest: '<%= paths.dest.tmpl %>',
                    options: {
                        htmlmin: {
                            collapseWhitespace: true,
                            collapseBooleanAttributes: true
                        }
                    }
                }
            },

            bower: {
                install: {
                    options: {
                        copy: false,
                        targetDir: './bower_components',
                        layout: 'byComponent',
                        install: true,
                        verbose: true,
                        prune: false,
                        cleanTargetDir: false,
                        cleanBowerDir: false,
                        bowerOptions: {}
                    }
                }
            },

            bower_concat: {
                all: {
                    dest: {
                        'js': '<%= paths.dest.vendor %>/js/bower-v<%= pkg.version %>.js',
                        'css': '<%= paths.dest.vendor %>/css/bower-v<%= pkg.version %>.css'
                    },
                    exclude: [
                        'jquery',
                        'modernizr'
                    ],
                    dependencies: {
                        'underscore': 'jquery'
                    },
                    bowerOptions: {
                        relative: false
                    },
                    mainFiles: {
                        'angular-i18n': 'angular-locale_es-co.js',
                        'moment': ["moment.js", "locale/es-do.js"]
                    },
                    callback: function (mainFiles, component) {
                        return mainFiles.map(function (filepath) {
                            // Use minified files if available
                            var min = filepath.replace(/\.js$/, '.min.js');
                            return grunt.file.exists(min) ? min : filepath;
                        });
                    }
                }
            },

            concat_css: {
                options: {
                    // Task-specific options go here.
                },
                all: {
                    src: ['assets/css/*.css'],
                    dest: '<%= paths.dest.css %>'
                },
            },

            concat: {
                options: {
                    separator: ';',
                },
                dist: {
                    src: [
                        'app/app.js',
                        'app/commons/*.js',
                        'app/**/*.module.js',
                        'app/**/*.js',
                        '<%= paths.dest.tmpl %>'
                    ],
                    dest: '<%= paths.dest.js %>'
                },
                vendor: {
                    src: [
                        'assets/js/*.js',
                    ],
                    dest: '<%= paths.dest.vendor %>/js/vendor-v<%= pkg.version %>.js'
                }
            },

            cssmin: {
                css: {
                    src: '<%= paths.dest.css %>',
                    dest: '<%= paths.dest.cssMin %>'
                }
            },

            uglify: {
                js: {
                    files: {
                        '<%= paths.dest.jsMin %>': ['<%= paths.dest.js %>']
                    }
                }
            },

            htmlbuild: {
                dist: {
                    src: 'index.html',
                    dest: '<%= paths.dest.index %>',
                    options: {
                        beautify: true,
                        relative: true,
                        scripts: {
                            vendor: [
                                '<%= paths.dest.adminLTE %>/plugins/jQuery/jQuery-2.1.4.min.js',
                                '<%= paths.dest.adminLTE %>/plugins/jQueryUI/jquery-ui.min.js',
                                '<%= paths.dest.adminLTE %>/bootstrap/js/bootstrap.min.js',
                                '<%= paths.dest.adminLTE %>/**/*.js',
                                '<%= paths.dest.vendor %>/js/vendor-v<%= pkg.version %>.js',
                                '<%= paths.dest.vendor %>/js/bower-v<%= pkg.version %>.js'
                            ],
                            dist: [
                                "<%= paths.dest.jsMin %>"
                            ]
                        },
                        styles: {
                            vendor: [
                                '<%= paths.dest.vendor %>/**/*.css'
                            ],
                            dist: [
                                "<%= paths.dest.cssMin %>"
                            ]
                        }
                    }
                }
            },

            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        '<%= paths.dest.indexMin %>': '<%= paths.dest.index %>'
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('build', [
        'jshint',
        'clean:build',
        'copy',
        'ngtemplates:app',
        'bower',
        'bower_concat',
        'concat_css',
        'concat',
        'concat:vendor',
        'cssmin:css',
        'uglify:js',
        'clean:temp',
        'htmlbuild:dist',
        'htmlmin',
        'clean:index'
    ]);
};