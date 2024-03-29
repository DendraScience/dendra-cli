const inquirer = require('inquirer')
const { removeOne } = require('./_remove')

module.exports = (ctx, { resource, servicePath }) => {
  const { mergedSettings, valid } = ctx

  return {
    pre(p) {
      return Object.assign(
        {
          id: p._sliced[0]
        },
        p
      )
    },

    check(p) {
      valid.objectId(p)
      return true
    },

    async execute(p) {
      if (!p.confirm) {
        const environment = mergedSettings.content.environment
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            default: false,
            message: `Remove ${resource} ${p.id} from ${environment}`,
            name: 'confirm'
          }
        ])

        if (!answers.confirm) return
      }

      return removeOne(ctx, {
        id: p.id,
        output: [],
        p,
        resource,
        servicePath
      })
    }
  }
}
