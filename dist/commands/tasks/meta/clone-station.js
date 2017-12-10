'use strict';

const ora = require('ora');
const { cloneOne, cloneMany } = require('./_clone');

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
      const spinner = ora({
        spinner: 'bouncingBar',
        stream: process.stdout,
        text: 'Cloning...'
      }).start();

      let count = 0;

      const station = await cloneOne(ctx, {
        id: p.id,
        output,
        p,
        resource: 'station',
        servicePath: '/stations'
      }, res => {
        count++;
        spinner.text = `Cloning station: ${res._id}`;

        delete res._id;
        res.enabled = false;
        res.name = `${res.name} (Clone)`;
        if (res.full_name) res.full_name = `${res.full_name} (Clone)`;
        if (res.slug) res.slug = `${res.slug}-clone`;

        return res;
      });

      if (p.deep) {
        await cloneMany(ctx, {
          output,
          p,
          query: {
            station_id: p.id
          },
          resource: 'datastream',
          servicePath: '/datastreams'
        }, res => {
          count++;
          spinner.text = `Cloning datastream: ${res._id}`;

          delete res._id;
          res.name = `${res.name} (Clone)`;
          if (res.station_id) res.station_id = station._id;

          return res;
        });
      }

      spinner.succeed(`Cloned ${count} resources(s)`);

      output.push(style.EMPTY);
      output.push('Done!');

      return output;
    }
  };
};