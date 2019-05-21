module.exports = ({ conns, file, parse, style }) => {
  return {
    pre(p) {
      return Object.assign(
        {
          query: p._sliced[0]
        },
        p
      )
    },

    beforeExecute(p) {
      parse.queryArgs(p, {
        $select: [
          '_id',
          'full_name',
          'is_abstract',
          'model',
          'name',
          'thing_type'
        ]
      })
    },

    execute(p) {
      return conns.web.app
        .service('/things')
        .find({ query: p.query })
        .then(res =>
          file.saveJson(res, p, {
            save: p.file
          })
        )
    },

    format(p, res) {
      return style.dataTable(
        res,
        [
          {
            name: '_id',
            size: 24
          },
          {
            alias: 'abst?',
            name: 'is_abstract',
            size: 5
          },
          {
            alias: 'type',
            name: 'thing_type',
            size: 12
          },
          {
            mode: 'fill',
            name: 'model',
            size: 18
          },
          {
            mode: 'fill',
            name: 'name',
            size: 24
          },
          {
            mode: 'fill',
            name: 'full_name',
            size: 24
          }
        ],
        p
      )
    }
  }
}
