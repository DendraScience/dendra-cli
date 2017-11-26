const userSettings = require('./userSettings')
const projectSettings = require('./projectSettings')

module.exports = async (app) => {
  await userSettings(app)
  await projectSettings(app)

  /*
    Feathers configuration uses node-config (https://github.com/lorenwest/node-config).

    We set NODE_APP_INSTANCE to the workspace environment which directs node-config to load and merge the
    appropriate app config files.
   */
  const workspaceEnv =
    app.get('projectSettings').safeContent.environment ||
    app.get('userSettings').safeContent.environment

  if (!workspaceEnv) throw new Error('Workspace environment is undefined')

  process.env.NODE_APP_INSTANCE = workspaceEnv

  app.set('workspaceEnv', workspaceEnv)
}
