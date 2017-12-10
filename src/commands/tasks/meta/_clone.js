/**
 * Meta clone helpers.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module meta/_clone
 */

async function cloneOne ({conns, file}, {id, output, override, p, resource, servicePath}, cb) {
  let res = await conns.web.app.service(servicePath).get(id)
  if (cb) res = cb(res)
  res = await conns.web.app.service(servicePath).create(res)

  if (p.verbose) output.push([{text: 'Created', tail: ':', bold: true}, {text: resource, bold: true}, {text: res._id, bold: true}])

  const out = await file.saveJson(res, p, {
    file: `${res._id}.${resource}.json`,
    save: p.file
  }, override)
  if (p.verbose && Array.isArray(out)) output.push(...out)

  return res
}

exports.cloneOne = cloneOne

async function cloneMany (ctx, {output, p, query, resource, servicePath}, cb) {
  const {conns} = ctx
  const $limit = 10
  const $select = ['_id']
  let $skip = 0

  while (true) {
    const findRes = await conns.web.app.service(servicePath).find({query: Object.assign({}, query, {
      $limit,
      $select,
      $skip
    })})

    if (!(findRes && findRes.data.length)) break

    for (let res of findRes.data) {
      try {
        await cloneOne(ctx, {
          id: res._id,
          output,
          override: {
            file: `${res._id}.${resource}.json`
          },
          p,
          resource,
          servicePath
        }, cb)
      } catch (err) {
        output.push([{text: 'Error', tail: ':'}, {text: resource}, {text: err.message}])
      }
    }

    $skip += $limit
  }
}

exports.cloneMany = cloneMany
