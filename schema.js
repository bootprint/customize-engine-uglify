/**
 * Returns a JSON-Schema for the configuration object.
 */
module.exports = {
  description: 'The configuration schema of the "customize-engine-uglify"',
  definitions: {
    'stringArray': {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  properties: {
    'uglify': {
      type: 'object',
      properties: {
        'files': {
          description: 'A name-path mapping of javascript-files',
          additionalProperties: {
            type: 'string',
            description: 'The path to the javascript-file. The key of the property is assumed to be the internal name for customize-overrides.'
          }
        },
        'options': {
          description: 'Options to pass to uglify. (see https://github.com/mishoo/UglifyJS2#api-reference)',
          type: 'object',
          properties: {
            'outSourceMap': {
              type: 'string'
            },
            'outFileName': {
              type: 'string'
            }
          }
        }
      }
    }
  }
}
