"use strict";

const inquirer = require('inquirer');
const ora = require('ora');
const {
  removeOne,
  removeMany
} = require('./_remove');
module.exports = ctx => {
  const {
    conns,
    mergedSettings,
    style,
    valid
  } = ctx;
  return {
    pre(p) {
      return Object.assign({
        id: p._sliced[0]
      }, p);
    },
    check(p) {
      valid.objectId(p);
      return true;
    },
    async execute(p) {
      let confirm = p.confirm;
      let confirmDeep = p.deep ? p.confirm_deep : false;
      if (typeof confirm !== 'boolean') {
        const environment = mergedSettings.content.environment;
        const answers = await inquirer.prompt([{
          type: 'confirm',
          default: false,
          message: `Remove organization ${p.id} from ${environment}`,
          name: 'confirm'
        }]);
        confirm = answers.confirm;
      }
      if (typeof confirmDeep !== 'boolean') {
        const answers = await inquirer.prompt([{
          type: 'confirm',
          default: false,
          message: 'Remove associated datastreams, stations, annotations, downloads, uploads, monitors and memberships',
          name: 'confirm'
        }]);
        confirmDeep = answers.confirm;
      }
      if (conns.web.remove_not_dangerous !== true) {
        const environment = mergedSettings.content.environment;
        const expected = 'REMOVE-ORGANIZATION';
        const answers = await inquirer.prompt([{
          type: 'input',
          message: `DANGER! You are about the remove the organization ${p.id} from ${environment}. Type ${expected} in all caps to confirm`,
          name: 'confirm'
        }]);
        if (answers.confirm !== expected) {
          confirm = false;
          confirmDeep = false;
        }
      }
      const output = [];
      let count = 0;
      let spinner;
      let organization;
      if (confirmDeep) {
        spinner = ora({
          spinner: 'bouncingBar',
          stream: process.stdout,
          text: 'Removing...'
        }).start();
        const resources = [['datastream', '/datastreams'], ['station', '/stations'], ['annotation', '/annotations'], ['download', '/downloads'], ['upload', '/uploads'], ['monitor', '/monitors'], ['membership', '/memberships']];
        for (const [resource, servicePath] of resources) {
          await removeMany(ctx, {
            output,
            p,
            query: {
              organization_id: p.id
            },
            resource,
            servicePath
          }, id => {
            count++;
            spinner.text = `Removing ${resource}: ${id}`;
          });
        }
      }
      if (confirm) {
        organization = await removeOne(ctx, {
          id: p.id,
          ignoreNotFound: confirmDeep,
          output,
          p,
          resource: 'organization',
          servicePath: '/organizations'
        }, id => {
          count++;
          if (spinner) spinner.text = `Removing organization: ${id}`;
        });
        if (!organization) count--;
      }
      if (spinner) {
        spinner.succeed(`Removed ${count} resources(s)`);
        output.push(style.EMPTY);
        output.push('Done!');
        return output;
      }
      return organization;
    }
  };
};