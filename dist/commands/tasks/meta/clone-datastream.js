'use strict';

const { cloneOne } = require('./_clone');

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
      const output = [];
      await cloneOne(ctx, {
        id: p.id,
        output,
        p,
        resource: 'datastream',
        servicePath: '/datastreams'
      }, res => {
        delete res._id;
        res.enabled = false;
        res.name = `${res.name} (Clone)`;
        return res;
      });

      output.push(style.EMPTY);
      output.push('Done!');

      return output;
    }
  };
};