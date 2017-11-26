module.exports = ({conns, file, style}) => {
  return {
    execute (p) {
      return conns.web.app.service('/system/schemas').find().then(res => {
        // HACK: API should return document objects
        res.data = res.data.map(el => ({$id: el}))

        return file.saveJson(res, p, {
          save: p.file
        })
      })
    },

    format (p, res) {
      return style.dataTable(res, [{
        name: '$id'
      }], p)
    }
  }
}
