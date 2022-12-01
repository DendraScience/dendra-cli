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
        $select: ['_id', 'enabled', 'is_enabled', 'name', 'serial_number']
      });
    },
    execute(p) {
      return conns.web.app.service('/things').find({
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
        alias: 'enab?',
        names: ['enabled', 'is_enabled'],
        size: 5
      }, {
        mode: 'fill',
        name: 'name',
        size: 24
      }, {
        mode: 'fill',
        name: 'serial_number',
        size: 24
      }], p);
    }
  };
};