"use strict";

module.exports = ({
  conns,
  file,
  parse,
  style
}) => {
  return {
    pre(p) {
      return Object.assign({
        query: p._sliced[0]
      }, p);
    },
    beforeExecute(p) {
      parse.queryArgs(p, {
        $select: ['_id', 'model', 'name']
      });
    },
    execute(p) {
      return conns.web.app.service('/thing-types').find({
        query: p.query
      }).then(res => file.saveJson(res, p, {
        save: p.file
      }));
    },
    format(p, res) {
      return style.dataTable(res, [{
        name: '_id',
        size: 24
      }, {
        mode: 'fill',
        name: 'model',
        size: 24
      }, {
        mode: 'fill',
        name: 'name',
        size: 36
      }], p);
    }
  };
};