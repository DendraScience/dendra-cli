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
        $select: ['_id', 'convertible_to_uom_ids', 'som_id', 'unit_tags']
      });
    },

    execute(p) {
      return conns.web.app.service('/uoms').find({
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
        name: 'som_id',
        size: 12
      }, {
        mode: 'fill',
        name: 'convertible_to_uom_ids',
        size: 36
      }, {
        mode: 'fill',
        name: 'unit_tags',
        size: 36
      }], p);
    }

  };
};