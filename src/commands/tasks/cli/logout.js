module.exports = ({ conns, mergedSettings, userSettings, utils }) => {
  return {
    async execute (p) {
      // Remove access token
      utils.setByDot(userSettings.content, `tokens.${conns.web.storageKey}`, undefined, true)
      await userSettings.save()

      return true
    },

    format () {
      return `You are logged out of: ${mergedSettings.content.environment}`
    }
  }
}
