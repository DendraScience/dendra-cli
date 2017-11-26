/**
 * Dendra CLI app.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module app
 */

const path = require('path')
const feathers = require('@feathersjs/feathers')
const boot = require('./boot')
// NOTE: This needs to be done late so we can set NODE_APP_INSTANCE based on the environemnt
// const configuration = require('@feathersjs/configuration')
const connections = require('./connections')
const commands = require('./commands')

module.exports = async (log) => {
  const app = feathers()

  app.logger = log

  // Init app
  await boot(app)

  /*
    Feathers configuration uses node-config (https://github.com/lorenwest/node-config).

    We set NODE_APP_INSTANCE to the workspace environment which directs node-config to load and merge the
    appropriate app config files.
   */

  process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../config')
  process.env.NODE_APP_INSTANCE = app.get('workspaceEnv')

  // Configure
  app.configure(require('@feathersjs/configuration')())

  // Feathers setup
  app.configure(connections)
    .configure(commands)

  return app
}
