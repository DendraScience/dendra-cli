/**
 * Dendra CLI app.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module app
 */

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

  // Configure
  app.configure(require('@feathersjs/configuration')())

  // Feathers setup
  app.configure(connections)
    .configure(commands)

  return app
}
