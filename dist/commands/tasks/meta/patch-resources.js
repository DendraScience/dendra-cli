"use strict";

const jsonata = require('jsonata');

const ProgressBar = require('progress');

module.exports = ({
  conns,
  file,
  parse,
  style,
  utils
}, {
  resource,
  servicePath,
  title
}) => {
  return {
    pre(p) {
      return Object.assign({
        query: p._sliced[0]
      }, p);
    },

    beforeExecute(p) {
      parse.queryArgs(p, null, {
        $select: ['_id']
      });
      parse.params(p);
    },

    async execute(p) {
      const text = await file.loadFile(p, {
        file: `patch.${resource}.jsonata`
      });
      let expr;

      try {
        expr = jsonata(text);
      } catch (err) {
        throw new Error(`Invalid JSONata: ${err.message}`);
      }

      const findRes = await conns.web.app.service(servicePath).find({
        query: p.query
      });
      const output = [];

      if (p.verbose && p.query) {
        output.push({
          query: p.query
        });
        output.push(style.EMPTY);
      }

      if (!findRes.data) throw new Error('No data');
      if (!findRes.data.length) output.push('No items found');
      const bar = new ProgressBar(`Patching ${title.toLowerCase()} [:bar] :current/:total`, {
        complete: '=',
        incomplete: ' ',
        renderThrottle: 0,
        stream: process.stdout,
        total: findRes.data.length,
        width: 20
      });

      for (let item of findRes.data) {
        const id = item._id;
        bar.tick({
          id
        });
        await utils.sleep();
        let res = await conns.web.app.service(servicePath).get(id);
        const data = expr.evaluate(res) || {};

        if (p.dry_run) {
          output.push([{
            text: 'Will patch',
            tail: ':'
          }, id]);
          output.push(data);
          output.push(res);
          output.push(style.EMPTY);
        } else {
          res = await conns.web.app.service(servicePath).patch(id, data, {
            query: {
              $client: p.params
            }
          });

          if (p.verbose) {
            output.push([{
              text: 'Patched',
              tail: ':'
            }, id]);
            output.push(data);
            output.push(res);
            output.push(style.EMPTY);
          }
        }
      }

      output.push(style.EMPTY);
      output.push('Done!');
      return output;
    }

  };
};