"use strict";

const inquirer = require('inquirer');
module.exports = ({
  check,
  conns,
  mergedSettings,
  userSettings,
  utils
}) => {
  return {
    pre(p) {
      return Object.assign({
        email: p._sliced[0],
        password: p._sliced[1]
      }, p);
    },
    async execute(p) {
      const questions = [];
      if (!p.email) {
        questions.push({
          type: 'input',
          message: 'Enter email',
          name: 'email',
          validate(value) {
            return check.nonEmptyString(value) || 'Required';
          }
        });
      }
      if (!p.password) {
        questions.push({
          type: 'password',
          message: 'Enter password',
          name: 'password',
          validate(value) {
            return check.nonEmptyString(value) || 'Required';
          }
        });
      }
      const answers = await inquirer.prompt(questions);
      const merged = Object.assign({}, p, answers);
      const authRes = await conns.web.app.authenticate({
        email: merged.email,
        password: merged.password,
        strategy: 'local'
      });
      const payload = await conns.web.app.passport.verifyJWT(authRes.accessToken);
      const userRes = await conns.web.app.service('/users').get(payload.userId);

      // Save access token to user settings
      utils.setByDot(userSettings.content, `tokens.${conns.web.storageKey}`, authRes.accessToken);
      await userSettings.save();
      return userRes;
    },
    format(p, res) {
      return `Hello ${res.name}, you are logged in to: ${mergedSettings.content.environment}`;
    }
  };
};