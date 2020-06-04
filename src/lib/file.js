/**
 * CLI file functions.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module lib/file
 */

const fs = require('fs')
const path = require('path')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')

function loadJson(p, defaults, override) {
  const opts = Object.assign({}, defaults, p, override)

  if (opts.file) {
    const fp = path.resolve(process.cwd(), opts.file)
    return loadJsonFile(fp)
  }

  return Promise.reject(new Error('Required: file'))
}

exports.loadJson = loadJson

function loadJsonata(p, defaults, override) {
  const opts = Object.assign({}, defaults, p, override)

  if (opts.jsonata) {
    const fp = path.resolve(process.cwd(), opts.jsonata)
    return fs.promises.readFile(fp, 'utf8')
  }

  return Promise.reject(new Error('Required: jsonata'))
}

exports.loadJsonata = loadJsonata

function saveJson(data, p, defaults, override) {
  const opts = Object.assign({}, defaults, p, override)

  if (opts.save && opts.file) {
    let writeOpts
    if (!p.output || p.output === 'indent') writeOpts = { indent: 2 }
    else if (p.output === 'raw') writeOpts = { indent: null }
    else return Promise.reject(new Error(`Output not supported: ${p.output}`))

    const fp = path.resolve(process.cwd(), opts.file)
    return writeJsonFile(fp, data, writeOpts).then(() => {
      return [[{ text: 'Saved', tail: ':' }, opts.file]]
    })
  } else if (opts.save && !opts.file) {
    return Promise.reject(new Error('Required: file'))
  }

  return Promise.resolve(data)
}

exports.saveJson = saveJson
