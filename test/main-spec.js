/*!
 * customize-engine-uglify <https://github.com/bootprint/customize-engine-uglify>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */

'use strict'

var chai = require('chai')
var expect = chai.expect
chai.use(require('chai-as-promised'))

var customize = require('customize')

describe('customize-engine-uglify:', function () {
  it('should minimize multiple files into a sinlge javascript', function () {
    var result = customize()
      .registerEngine('uglify', require('../'))
      .merge({
        uglify: {
          files: {
            'a': './test/fixtures/a.js',
            'b': './test/fixtures/b.js'
          }
        }
      })
      .run()
    return expect(result).to.eventually.deep.equal({
      'uglify': {
        'bundle.js': 'a=1,b=1;\n//# sourceMappingURL=bundle.js.map',
        'bundle.js.map': '{"version":3,"sources":["./test/fixtures/a.js","./test/fixtures/b.js"],"names":["a","b"],"mappings":"AAAAA,EAAE,ECAFC,EAAE","file":"bundle.js"}'
      }
    })
  })

  it('should minimize override files when merging', function () {
    var result = customize()
      .registerEngine('uglify', require('../'))
      .merge({
        uglify: {
          files: {
            'a': './test/fixtures/a.js',
            'b': './test/fixtures/b.js'
          }
        }
      })
      .merge({
        uglify: {
          files: {
            'a': './test/fixtures/a2.js'
          }
        }
      })
      .run()
    return expect(result).to.eventually.deep.equal({
      'uglify': {
        'bundle.js': 'a=2,b=1;\n//# sourceMappingURL=bundle.js.map',
        'bundle.js.map': '{"version":3,"sources":["./test/fixtures/a2.js","./test/fixtures/b.js"],"names":["a","b"],"mappings":"AAAAA,EAAE,ECAFC,EAAE","file":"bundle.js"}'
      }
    })
  })

  it('should return an empty file if no input files are given', function () {
    var result = customize()
      .registerEngine('uglify', require('../'))
      .merge({
        uglify: {}
      })
      .run()
    return expect(result).to.eventually.deep.equal({
      'uglify': {
        'bundle.js': ''
      }
    })
  })

  it('should preserve license comments', function () {
    return customize()
      .registerEngine('uglify', require('../'))
      .merge({
        uglify: {
          files: {
            'with-comment': './test/fixtures/with-comment.js'
          }
        }

      })
      .run()
      .then(function (result) {
        return expect(result.uglify['bundle.js']).to.equal('/*!\n * A license\n */\n/* @license */\n/* @preserve */\n\n//# sourceMappingURL=bundle.js.map')
      })
  })

  it('should add dependencies first', function () {
    return customize()
      .registerEngine('uglify', require('../'))
      .merge({
        uglify: {
          files: {
            'a': './test/fixtures/a.js',
            'b': './test/fixtures/b.js',
            'c': './test/fixtures/c.js'
          },
          dependencies: {
            'a': ['b'],
            'b': ['c']
          }
        }
      })
      .run()
      .then(function (result) {
        return expect(result.uglify['bundle.js']).to.match(/c=1,b=1,a=1;/)
      })
  })

  it('should add dependencies first (and the other way around)', function () {
    // To make sure(r) it is not the indeterministic iteration order of objects
    return customize()
      .registerEngine('uglify', require('../'))
      .merge({
        uglify: {
          files: {
            'a': './test/fixtures/a.js',
            'b': './test/fixtures/b.js',
            'c': './test/fixtures/c.js'
          },
          dependencies: {
            'c': ['b'],
            'b': ['a']
          }
        }
      })
      .run()
      .then(function (result) {
        return expect(result.uglify['bundle.js']).to.match(/a=1,b=1,c=1;/)
      })
  })
})
