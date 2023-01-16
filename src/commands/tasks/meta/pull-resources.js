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

      const suffix = `.${resource}.json`
      const output = []
      const limit =
        p.query.$limit === -1 ? Number.MAX_SAFE_INTEGER : p.query.$limit
      const $limit = 2000
      let $skip = 0
      let count = 0
      let bar

      while (count < limit) {
        const findRes = await conns.web.app.service(servicePath).find({
          query: Object.assign({}, p.query, {
            $limit,
            $skip
          })
        })

        if (p.verbose && p.query) {
          output.push({ query: p.query })
          output.push(style.EMPTY)
        }

        if (!(findRes.data && findRes.data.length)) {
          if ($skip === 0) output.push('No items found')
          break
        }

        if (!bar)
          bar = new ProgressBar(
            `Downloading ${title.toLowerCase()} [:bar] :current/:total`,
            {
              complete: '=',
              incomplete: ' ',
              renderThrottle: 0,
              stream: process.stdout,
              total: Math.min(findRes.total | 0, limit),
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

        count++
        $skip += $limit

        output.push(style.EMPTY)
      }

      output.push('Done!')

      return output
    }
  }
}
