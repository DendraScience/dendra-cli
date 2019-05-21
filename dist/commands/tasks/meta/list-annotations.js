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
        $select: ['_id', 'begins_at', 'enabled', 'ends_before', 'is_enabled', 'title']
      });
    },

    execute(p) {
      return conns.web.app.service('/annotations').find({
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
        name: 'begins_at',
        size: 24
      }, {
        name: 'ends_before',
        size: 24
      }, {
        mode: 'fill',
        name: 'title',
        size: 36
      }], p);
    }

  };
};