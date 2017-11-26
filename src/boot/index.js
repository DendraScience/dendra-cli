const userSettings = require('./userSettings')
const projectSettings = require('./projectSettings')

module.exports = async (app) => {
  await userSettings(app)
  await projectSettings(app)

  const workspaceEnv =
    app.get('projectSettings').safeContent.environment ||
    app.get('userSettings').safeContent.environment

  if (!workspaceEnv) throw new Error('Workspace environment is undefined')

  app.set('workspaceEnv', workspaceEnv)
}
