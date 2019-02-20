"use strict";

const path = require('path');

const COMMANDS = ['get-schema', 'get-time', 'schemas'];

module.exports = ctx => {
  const {
    style
  } = ctx;
  const tasks = {};
  COMMANDS.forEach(cmd => {
    Object.defineProperty(tasks, cmd, {
      get: () => require(path.join(__dirname, cmd))(ctx)
    });
  });
  return {
    help(p) {
      return style.commandHelp({
        title: 'System command help:',
        synopsis: [{
          lbl: 'system',
          cmd: '<sub>',
          opts: '[<options>] [<args>]'
        }, {}, {
          lbl: 'system',
          cmd: 'get-*',
          opts: '--id=<id> [--file=<file> | --save] [--output=color|indent|raw]'
        }],
        groups: [{
          header: 'Common Options',
          items: [{
            opts: '--id=<id>',
            desc: 'Unique identifier of a resource'
          }, {
            opts: '--file=<file>',
            desc: 'Name of file to load from or save to'
          }, {
            opts: '--save',
            desc: 'Write the response of this command back to a file'
          }, {
            opts: '--output=<format>',
            desc: 'Override the default output format'
          }]
        }, {
          header: 'Subcommands',
          items: [{
            cmd: 'get-schema',
            desc: 'Fetch a JSON schema having <id>'
          }, {
            cmd: 'schemas',
            desc: 'Return list of all schemas'
          }, {}, {
            cmd: 'get-time',
            desc: 'Fetch current time in zone <id> (default "utc")'
          }]
        }]
      }, p);
    },

    tasks
  };
};