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
          'description',
          'label',
          'scheme_id',
          'vocabulary_type'
        ]
      })
    },

    execute (p) {
      return conns.web.app.service('/vocabularies').find({query: p.query})
        .then(res => file.saveJson(res, p, {
          save: p.file
        }))
    },

    format (p, res) {
      return style.dataTable(res, [{
        name: '_id',
        size: 24
      }, {
        name: 'scheme_id',
        size: 12
      }, {
        alias: 'type',
        name: 'vocabulary_type',
        size: 12
      }, {
        mode: 'fill',
        name: 'label',
        size: 18
      }, {
        mode: 'fill',
        name: 'description',
        size: 36
      }], p)
    }
  }
}
