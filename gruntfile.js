module.exports = function (grunt) {
  grunt.initConfig({
    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/' // ...to the specified directory
        },
        processors: [
          require('postcss-cssnext')() // add vendor prefixes
        ]
      },
      dist: {
        src: 'src/stereo-convergence.css',
        dest: 'dist/stereo-convergence.css'
      }
    },
    cssnano: {
      options: {
        sourcemap: false
      },
      dist: {
        files: {
          'dist/stereo-convergence.min.css': 'dist/stereo-convergence.css'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/stereo-convergence.min.js': 'dist/stereo-convergence.js'
        }
      }
    },
    umd: {
      all: {
        options: {
          src: 'src/stereo-convergence.js',
          dest: 'dist/stereo-convergence.js',
          // template: 'path/to/template.hbs', // optional, a template from templates subdir
          // can be specified by name (e.g. 'umd'); if missing, the templates/umd.hbs
          // file will be used from [libumd](https://github.com/bebraw/libumd)
          objectToExport: 'StereoConvergence' // optional, internal object that will be exported
          // amdModuleId: 'id', // optional, if missing the AMD module will be anonymous
          // globalAlias: 'alias', // optional, changes the name of the global variable
          // deps: { // optional, `default` is used as a fallback for rest!
          //   'default': ['foo', 'bar'],
          //   amd: ['foobar', 'barbar'],
          //   cjs: ['foo', 'barbar'],
          //   global: ['foobar', {depName: 'param'}]
          // }
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['umd', 'uglify'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['src/*.css'],
        tasks: ['postcss', 'cssnano'],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-umd')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-cssnano')

  grunt.registerTask('build', ['postcss', 'cssnano', 'umd', 'uglify'])

  grunt.registerTask('default', [
    'postcss',
    'umd',
    'uglify'
  ])
}
