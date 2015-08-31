#!/usr/bin/env node
'use strict';
var meow = require('meow');
var askbudi = require('./');

var cli = meow({
  help: [
    'Usage',
    '  askbudi <input>',
    '',
    'Example',
    '  askbudi Unicorn'
  ].join('\n')
});

askbudi(cli.input[0]);
