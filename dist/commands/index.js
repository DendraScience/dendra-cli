'use strict';

const chalk = require('chalk');
const check = require('check-types');
const file = require('../lib/file');
const parse = require('../lib/parse');
const style = require('../lib/style');
const tasks = require('./tasks');
const utils = require('../lib/utils');
const valid = require('../lib/valid');
const { TaskCommand } = require('@dendra-science/task-command');

module.exports = function () {
  const app = this;

  // Decorate app with the command processor
  // TODO: Do this better - perhaps mixin eval
  app.command = new TaskCommand(tasks({
    app,
    chalk,
    check,
    conns: app.get('connections'),
    file,
    parse,
    projectSettings: app.get('projectSettings'),
    style,
    userSettings: app.get('userSettings'),
    utils,
    valid,
    workspaceEnv: app.get('workspaceEnv')
  }));
};