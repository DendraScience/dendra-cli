'use strict';

module.exports = ({ conns, file, valid }) => {
  return {
    pre(p) {
      return Object.assign({
        id: p._sliced[0] || 'utc'
      }, p);
    },

    check(p) {
      valid.string(p, 'id');
      return true;
    },

    execute(p) {
      return conns.web.app.service('/system/time').get(p.id).then(res => file.saveJson(res, p, {
        file: `${res._id}.time.json`,
        save: p.file
      }));
    }
  };
};