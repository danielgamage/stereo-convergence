module.exports = function(grunt) {
  grunt.initConfig({
    postcss: {
      options: {

        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/' // ...to the specified directory
        },

        processors: [
          require('postcss-cssnext')(), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'src/stereo-convergence.css',
        dest: 'dist/stereo-convergence.css'
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/stereo-convergence.min.js': 'src/stereo-convergence.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'postcss',
    'uglify'
  ]);
};
