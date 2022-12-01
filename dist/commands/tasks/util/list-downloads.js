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
        $select: ['_id', 'storage.method', 'spec_type', 'spec.method', 'spec.comment']
      });
    },
    execute(p) {
      return conns.web.app.service('/downloads').find({
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
        name: 'storage.method',
        size: 18
      }, {
        name: 'spec_type',
        size: 12
      }, {
        name: 'spec.method',
        size: 18
      }, {
        mode: 'fill',
        name: 'spec.comment',
        size: 36
      }], p);
    }
  };
};