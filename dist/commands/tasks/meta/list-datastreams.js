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
        $select: ['_id', 'enabled', 'name', 'source', 'source_type', 'state']
      });
    },

    execute(p) {
      return conns.web.app.service('/datastreams').find({
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
        name: 'enabled',
        size: 5
      }, {
        name: 'source_type',
        size: 12
      }, {
        name: 'state',
        size: 8
      }, {
        mode: 'fill',
        name: 'source',
        size: 18
      }, {
        mode: 'fill',
        name: 'name',
        size: 36
      }], p);
    }

  };
};