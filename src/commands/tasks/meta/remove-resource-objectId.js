const inquirer = require('inquirer')

module.exports = ({conns, file, valid}, {resource, servicePath}) => {
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
      if (!p.confirm) {
        const answers = await inquirer.prompt([{
          type: 'confirm',
          default: false,
          message: `Destroy ${resource} ${p.id}`,
          name: 'confirm'
        }])

        if (!answers.confirm) return
      }

      return conns.web.app.service(servicePath).remove(p.id)
        .then(res => file.saveJson(res, p, {
          file: `${res._id}.${resource}.json`,
          save: p.file
        }))
    }
  }
}
