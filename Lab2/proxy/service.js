var convict = require('convict');

const convict_format_with_validator = require('convict-format-with-validator');

// Add all formats for validation
convict.addFormats(convict_format_with_validator);

var conf = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
      },
    url: {
        doc: 'The IP address to bind.',
        format: 'url',
        default: 'http://127.0.0.1:3000/',
        env: 'IP_ADDRESS',
      },
      port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3001,
        env: 'PORT',
      }
});


// Perform validation
conf.validate({allowed: 'strict'});

module.exports = conf;