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
        $select: ['_id', 'email', 'name']
      });
    },
    execute(p) {
      return conns.web.app.service('/organizations').find({
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
        name: 'email',
        size: 24
      }, {
        mode: 'fill',
        name: 'name',
        size: 36
      }], p);
    }
  };
};