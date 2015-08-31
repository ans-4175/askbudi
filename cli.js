#!/usr/bin/env node
'use strict';
var meow = require('meow');
var kbbibot = require('./');

var cli = meow({
  help: [
    'Usage',
    '  kbbibot <input>',
    '',
    'Example',
    '  kbbibot Unicorn'
  ].join('\n')
});

kbbibot(cli.input[0]);
