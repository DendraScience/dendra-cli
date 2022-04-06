const jsonata = require('jsonata')
const path = require('path')
const ProgressBar = require('progress')

module.exports = (
  { conns, file, parse, style, utils },
  { resource, servicePath, title }
) => {
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
      parse.queryArgs(p, null, {
        $select: ['_id']
      })
    },

    async execute(p) {
      let expr

      if (p.jsonata) {
        const text = await file.loadJsonata(p)
        try {
          expr = jsonata(text)
        } catch (err) {
          throw new Error(`Invalid JSONata: ${err.message}`)
        }
      }

      const findRes = await conns.web.app
        .service(servicePath)
        .find({ query: p.query })
      const suffix = `.${resource}.json`
      const output = []

      if (p.verbose && p.query) {
        output.push({ query: p.query })
        output.push(style.EMPTY)
      }

      if (!findRes.data) throw new Error('No data')
      if (!findRes.data.length) output.push('No items found')

      const bar = new ProgressBar(
        `Downloading ${title.toLowerCase()} [:bar] :current/:total`,
        {
          complete: '=',
          incomplete: ' ',
          renderThrottle: 0,
          stream: process.stdout,
          total: findRes.data.length,
          width: 20
        }
      )

      for (const item of findRes.data) {
        const fn = path.join(p.dir || '', `${item._id}${suffix}`)

        bar.tick({ fn })

        await utils.sleep()

        const res = await conns.web.app.service(servicePath).get(item._id)
        let data = res

        if (expr)
          try {
            data = expr.evaluate(res)
          } catch (err) {
            if (err.message) {
              output.push([{ text: 'Eval error', tail: ':' }, fn])
              output.push(err.message)
              break
            } else {
              throw err
            }
          }

        if (p.dry_run) {
          output.push([{ text: 'Will save', tail: ':' }, fn])
        } else {
          const out = await file.saveJson(data, p, null, {
            file: fn,
            save: true
          })
          if (p.verbose && Array.isArray(out)) output.push(...out)
        }
      }

      output.push(style.EMPTY)
      output.push('Done!')

      return output
    }
  }
}
