"use strict";

module.exports = ({
  conns,
  mergedSettings,
  style,
  userSettings,
  utils
}) => {
  return {
    async execute(p) {
      const accessToken = utils.getByDot(userSettings.content, `tokens.${conns.web.storageKey}`);
      if (!accessToken) return {
        logged_out: true
      };
      const payload = await conns.web.app.passport.verifyJWT(accessToken);
      const userRes = await conns.web.app.service('/users').get(payload.userId);
      return userRes;
    },

    format(p, res) {
      const environment = mergedSettings.content.environment;
      if (res.logged_out) return `Logged out of: ${environment}`;
      return [res, style.EMPTY, `Logged in to: ${environment}`];
    }

  };
};