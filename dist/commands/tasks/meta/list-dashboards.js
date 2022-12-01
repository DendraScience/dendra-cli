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
        $select: ['_id', 'enabled', 'is_enabled', 'name', 'slug', 'sort_value', 'utc_offset']
      });
    },
    execute(p) {
      return conns.web.app.service('/dashboards').find({
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
        alias: 'sort',
        name: 'sort_value',
        opts: {
          alignment: 'right'
        },
        size: 6
      }, {
        alias: 'offset',
        name: 'utc_offset',
        opts: {
          alignment: 'right'
        },
        size: 6
      }, {
        mode: 'fill',
        name: 'slug',
        size: 24
      }, {
        mode: 'fill',
        name: 'name',
        size: 24
      }], p);
    }
  };
};