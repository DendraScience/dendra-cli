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
        $select: ['_id', 'organization_id', 'person_id', 'roles']
      });
    },
    execute(p) {
      return conns.web.app.service('/memberships').find({
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
        name: 'organization_id',
        size: 24
      }, {
        name: 'person_id',
        size: 24
      }, {
        mode: 'fill',
        name: 'roles',
        size: 36
      }], p);
    }
  };
};