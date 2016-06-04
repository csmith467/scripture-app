'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'build'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    appConfig: appConfig,

    // Empties folders to start fresh
    clean: {
        build: {
          files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= appConfig.dist %>/{,*/}*',
              '!<%= appConfig.dist %>/.git{,*/}*'
            ]
          }]
        },
        temp: {
          files: [{
            dot: true,
            src: [
              '.tmp'
            ]
          }]
        }
     },

    // Insert bower_components
    wiredep: {
       target: {
         src: 'app/index.html'
       }
    },

    // Copy html files to build folder
    copy: {
      main: {
         files: [{
            expand: true,
            cwd: 'app/',
            src: [
               '*.html',
               'views/{,*/}*.html',
               'images/*'
            ],
            dest: 'build/'
         },
         {
            expand: true,
            cwd: 'bower_components/font-awesome/',
            src: [
               'fonts/*'
            ],
            dest: 'build/'
         }]
      }
   },

   useminPrepare: {
     html: '<%= appConfig.app %>/index.html',
     options: {
      dest: '<%= appConfig.dist %>'
     }
   },

   // Performs rewrites based on filerev and the useminPrepare configuration
   usemin: {
     html: ['<%= appConfig.dist %>/{,*/}*.html', '<%= appConfig.dist %>/{,*/}{,*/}*.html'],
     css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
     js: ['<%= appConfig.dist %>/scripts/{,*/}*.js','<%= appConfig.dist %>/scripts/{,*/}{,*/}*.js'],
     options: {
      assetsDirs: [
        '<%= appConfig.dist %>',
        '<%= appConfig.dist %>/images',
        '<%= appConfig.dist %>/styles',
        '<%= appConfig.dist %>/scripts'
      ],
      patterns: {
           js: [
               [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp))/gm, 'Update the JS to reference our revved images']
           ]
      }
     }
  },
  // ng-annotate tries to make the code safe for minification automatically
  // by using the Angular long form for dependency injection.
  ngAnnotate: {
    dist: {
      files: [{
        expand: true,
        cwd: '.tmp/concat/scripts',
        src: '*.js',
        dest: '.tmp/concat/scripts'
      }]
    }
  }

  });

  grunt.registerTask('build', [
     'clean:build',
     'wiredep',
     'copy:main',
     'useminPrepare',
     'concat',
     'ngAnnotate',
     'uglify',
     'cssmin',
     'usemin',
     'clean:temp'
  ]);

  grunt.registerTask('update', [
     'wiredep'
  ]);

  grunt.registerTask('default', [
    'clean:build',
    'wiredep',
    'copy:main',
    'useminPrepare',
    'concat',
    'ngAnnotate',
    'uglify',
    'cssmin',
    'usemin',
    'clean:temp'
  ]);

};
