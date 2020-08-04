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
        $select: ['_id', 'full_name', 'name', 'company_type']
      });
    },

    execute(p) {
      return conns.web.app.service('/companies').find({
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
        alias: 'type',
        name: 'company_type',
        size: 12
      }, {
        mode: 'fill',
        name: 'name',
        size: 24
      }, {
        mode: 'fill',
        name: 'full_name',
        size: 24
      }], p);
    }

  };
};