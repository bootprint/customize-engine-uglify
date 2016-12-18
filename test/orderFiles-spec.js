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

var orderFiles = require('../lib/orderFiles')

describe('orderFiles', function () {
  it('should order file entries based on the dependency map', function () {
    var result = orderFiles(['3', '2', '1'], {'3': ['2'], '2': ['1']})
    expect(result).to.deep.equal(['1', '2', '3'])
  })

  it('should not forget any files that are no dependency', function () {
    var result = orderFiles(['4', '3', '2', '1'], {'3': ['2'], '2': ['1']})
    expect(result).to.deep.equal(['4', '1', '2', '3'])
  })

  it('should throw an error if there are cycles', function () {
    expect(function () {
      orderFiles(['3', '2', '1'], {'3': ['2'], '2': ['1'], '1': ['3']})
    }).to.throw(Error, 'Dependency cycle found ["3","2","1"]')
  })

  it('should throw an error if a dependency is not in the array', function () {
    expect(function () {
      orderFiles(['3', '2', '1'], {'3': ['2'], '2': ['4']})
    }).to.throw(Error, 'Dependency "4" of file "2" is not part of ["3","2","1"]')
  })
})
