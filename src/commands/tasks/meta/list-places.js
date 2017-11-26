module.exports = ({conns, file, parse, style}) => {
  return {
    pre (p) {
      return Object.assign({
        query: p._sliced[0]
      }, p)
    },

    beforeExecute (p) {
      parse.queryArgs(p, {
        $select: [
          '_id',
          'full_name',
          'geo.type',
          'name',
          'place_type'
        ]
      })
    },

    execute (p) {
      return conns.web.app.service('/places').find({query: p.query})
        .then(res => file.saveJson(res, p, {
          save: p.file
        }))
    },

    format (p, res) {
      return style.dataTable(res, [{
        name: '_id',
        size: 24
      }, {
        alias: 'type',
        name: 'place_type',
        size: 12
      }, {
        name: 'geo.type',
        size: 12
      }, {
        mode: 'fill',
        name: 'name',
        size: 24
      }, {
        mode: 'fill',
        name: 'full_name',
        size: 24
      }], p)
    }
  }
}
