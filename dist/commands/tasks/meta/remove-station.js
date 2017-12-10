'use strict';

const inquirer = require('inquirer');
const { removeOne, removeMany } = require('./_remove');

module.exports = ctx => {
  const { style, valid } = ctx;

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
        const answers = await inquirer.prompt([{
          type: 'confirm',
          default: false,
          message: `Remove station ${p.id}`,
          name: 'confirm'
        }]);

        confirm = answers.confirm;
      }

      if (typeof confirmDeep !== 'boolean') {
        const answers = await inquirer.prompt([{
          type: 'confirm',
          default: false,
          message: 'Remove associated datastreams',
          name: 'confirm'
        }]);

        confirmDeep = answers.confirm;
      }

      const output = [];
      let station;

      if (confirmDeep) {
        await removeMany(ctx, {
          output,
          p,
          query: {
            station_id: p.id
          },
          resource: 'datastream',
          servicePath: '/datastreams'
        });
      }

      if (confirm) {
        station = await removeOne(ctx, {
          id: p.id,
          output,
          p,
          resource: 'station',
          servicePath: '/stations'
        });
      }

      if (confirmDeep) {
        output.push(style.EMPTY);
        output.push('Done!');

        return output;
      }

      return station;
    }
  };
};