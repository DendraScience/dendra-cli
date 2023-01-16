/**
 * Meta remove helpers.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module meta/_remove
 */

async function removeOne(
  { conns, file },
  { id, ignoreNotFound, output, override, p, resource, servicePath },
  cb
) {
  if (cb) cb(id)
  let res

  try {
    res = await conns.web.app.service(servicePath).remove(id)
  } catch (err) {
    if (err.code === 404 && ignoreNotFound) return res
    else throw err
  }

  if (p.verbose)
    output.push([
      { text: 'Removed', tail: ':', bold: true },
      { text: resource, bold: true },
      { text: res._id, bold: true }
    ])

  const out = await file.saveJson(
    res,
    p,
    {
      file: `${res._id}.${resource}.json`,
      save: p.file
    },
    override
  )
  if (p.verbose && Array.isArray(out)) output.push(...out)

  return res
}

exports.removeOne = removeOne

async function removeMany(
  ctx,
  { output, p, query, resource, servicePath },
  cb
) {
  const { conns } = ctx
  const $limit = 100
  const $select = ['_id']

  while (true) {
    const findRes = await conns.web.app.service(servicePath).find({
      query: Object.assign({}, query, {
        $limit,
        $select
      })
    })

    if (!(findRes && findRes.data && findRes.data.length)) break

    for (const res of findRes.data) {
      await removeOne(
        ctx,
        {
          id: res._id,
          output,
          override: {
            file: `${res._id}.${resource}.json`
          },
          p,
          resource,
          servicePath
        },
        cb
      )
    }
  }
}

exports.removeMany = removeMany
