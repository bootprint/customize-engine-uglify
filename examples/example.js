var customize = require('customize')

// Load files from one directory and merge with a second one
customize()
  .registerEngine('uglify', require('../'))
  // Add two javascript files
  .merge({
    uglify: {
      files: {
        'a-browser-lib.js': require.resolve('./module1/a-browser-lib.js'),
        'another-browser-lib.js': require.resolve('./module1/another-browser-lib.js')
      },
      dependencies: {
        'a-browser-lib.js': [ 'another-browser-lib.js' ]
      }
    }
  })
  // Add another js file overriding "a-browser-lib.js"
  .merge({
    uglify: {
      files: {
        'a-browser-lib.js': require.resolve('./module2/overriding-browser-lib.js')
      }
    }
  })
  .run()
  .done(console.log)
