/*!
 * customize-engine-uglify <https://github.com/nknapp/customize-engine-uglify>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */
'use strict'

var _ = require('lodash')
var uglify = require('uglify-js')

module.exports = {
  schema: require('./schema.js'),

  defaultConfig: {
    options: {
      outFileName: 'bundle.js',
      outSourceMap: 'bundle.js.map'
    }
  },

  preprocessConfig: function (config) {
    // No preprocessing needed at the moment, since we just merge objects
    return config
  },

  watched: function (config) {
    return _.values(config.files)
  },

  /**
   * Run uglify and store the resulting JavaScript and Source-Map into the result object
   * @param config
   */
  run: function (config) {
    var result = uglify.minify(_.values(config.files), config.options)
    var outputFiles = {}
    outputFiles[config.options.outFileName] = result.code
    outputFiles[config.options.outSourceMap] = result.map
    return outputFiles
  }
}

