const { cloneOne } = require('./_clone')

module.exports = (ctx) => {
  const { style, valid } = ctx

  return {
    pre (p) {
      return Object.assign({
        id: p._sliced[0]
      }, p)
    },

    check (p) {
      valid.objectId(p)
      return true
    },

    async execute (p) {
      const output = []

      await cloneOne(ctx, {
        id: p.id,
        output,
        p,
        resource: 'dashboard',
        servicePath: '/dashboards'
      }, res => {
        delete res._id
        res.enabled = false
        res.name = `${res.name} (Clone)`
        if (res.slug) res.slug = `${res.slug}-clone`

        return res
      })

      output.push(style.EMPTY)
      output.push('Done!')

      return output
    }
  }
}
