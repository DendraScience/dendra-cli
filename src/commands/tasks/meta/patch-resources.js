const jsonata = require('jsonata')
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
      parse.params(p)
    },

    async execute(p) {
      const text = await file.loadJsonata(p, {
        jsonata: `patch.${resource}.jsonata`
      })

      let expr
      try {
        expr = jsonata(text)
      } catch (err) {
        throw new Error(`Invalid JSONata: ${err.message}`)
      }

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
            `Patching ${title.toLowerCase()} [:bar] :current/:total`,
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
          const id = item._id

          bar.tick({ id })

          await utils.sleep()

          let res = await conns.web.app.service(servicePath).get(id)
          let data = {}

          if (expr)
            try {
              data = expr.evaluate(res)
            } catch (err) {
              if (err.message) {
                output.push([{ text: 'Eval error', tail: ':' }, id])
                output.push(err.message)
                break
              } else {
                throw err
              }
            }

          if (p.dry_run) {
            output.push([{ text: 'Will patch', tail: ':' }, id])
            output.push(data)
            output.push(res)
            output.push(style.EMPTY)
          } else {
            res = await conns.web.app
              .service(servicePath)
              .patch(id, data, { query: { $client: p.params } })
            if (p.verbose) {
              output.push([{ text: 'Patched', tail: ':' }, id])
              output.push(data)
              output.push(res)
              output.push(style.EMPTY)
            }
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
