"use strict";

const path = require('path');

const COMMANDS = ['cli', 'init', 'login', 'logout', 'meta', 'system', 'whoami'];

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
        title: 'Command line tool for metahumans.',
        synopsis: [{
          cmd: '<command>',
          opts: '[<options>] [<args>]'
        }, {
          cmd: '<command>',
          sub: '<sub>',
          opts: '[<options>] [<args>]'
        }, {}, {
          cmd: 'login',
          opts: '[--email=<str>] [--password=<str>]'
        }],
        groups: [{
          header: 'Options',
          items: [{
            opts: '--email=<str>',
            desc: 'Email address of a registered user'
          }, {
            opts: '--password=<str>',
            desc: 'Login password of a registered user'
          }]
        }, {
          header: 'Commands',
          items: [{
            cmd: 'help',
            desc: 'Show help on commands'
          }, {}, {
            cmd: 'init',
            desc: 'Create a project settings file (den.json) in the current directory'
          }, {
            cmd: 'login',
            desc: 'Log in to a Dendra environment, prompt for credentials if not provided'
          }, {
            cmd: 'logout',
            desc: 'Log out of a Dendra environment'
          }, {
            cmd: 'whoami',
            desc: 'Display the logged in user and environment'
          }]
        }, {
          header: 'Subcommands',
          items: [{
            cmd: 'cli',
            sub: 'help',
            desc: 'Show help on CLI subcommands'
          }, {
            cmd: 'cli',
            sub: '<sub>',
            desc: 'Run a CLI subcommand'
          }, // JSS: Not implemented
          // {},
          // { cmd: 'json', sub: 'help', desc: 'Show help on JSON subcommands' },
          // { cmd: 'json', sub: '<sub>', desc: 'Run a JSON subcommand' },
          {}, {
            cmd: 'meta',
            sub: 'help',
            desc: 'Show help on metadata subcommands'
          }, {
            cmd: 'meta',
            sub: '<sub>',
            desc: 'Run a metadata subcommand'
          }, {}, {
            cmd: 'system',
            sub: 'help',
            desc: 'Show help on system subcommands'
          }, {
            cmd: 'system',
            sub: '<sub>',
            desc: 'Run a system subcommand'
          } // JSS: Not implemented
          // {},
          // { cmd: 'version', sub: 'help', desc: 'Show help on version subcommands' },
          // { cmd: 'version', sub: '<sub>', desc: 'Run a version subcommand' },
          // { cmd: 'version', desc: 'Show Dendra version info' }
          ]
        }]
      }, p);
    },

    tasks
  };
};