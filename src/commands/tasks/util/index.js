const path = require('path')

const COMMANDS = [
  {
    prop: 'create-download',
    req: '../meta/create-resource',
    resource: 'download',
    servicePath: '/downloads'
  },
  {
    prop: 'get-download',
    req: '../meta/get-resource-objectId',
    resource: 'download',
    servicePath: '/downloads'
  },
  { prop: 'list-downloads', req: 'list-downloads' },
  {
    prop: 'remove-download',
    req: '../meta/remove-resource-objectId',
    resource: 'download',
    servicePath: '/downloads'
  },
  {
    prop: 'update-download',
    req: '../meta/update-resource',
    resource: 'download',
    servicePath: '/downloads'
  },

  {
    prop: 'create-monitor',
    req: '../meta/create-resource',
    resource: 'monitor',
    servicePath: '/monitors'
  },
  {
    prop: 'get-monitor',
    req: '../meta/get-resource-objectId',
    resource: 'monitor',
    servicePath: '/monitors'
  },
  { prop: 'list-monitors', req: 'list-monitors' },
  {
    prop: 'remove-monitor',
    req: '../meta/remove-resource-objectId',
    resource: 'monitor',
    servicePath: '/monitors'
  },
  {
    prop: 'update-monitor',
    req: '../meta/update-resource',
    resource: 'monitor',
    servicePath: '/monitors'
  },

  {
    prop: 'create-upload',
    req: '../meta/create-resource',
    resource: 'upload',
    servicePath: '/uploads'
  },
  {
    prop: 'get-upload',
    req: '../meta/get-resource-objectId',
    resource: 'upload',
    servicePath: '/uploads'
  },
  { prop: 'list-uploads', req: 'list-uploads' },
  {
    prop: 'patch-uploads',
    req: '../meta/patch-resources',
    resource: 'upload',
    servicePath: '/uploads',
    title: 'Uploads'
  },
  {
    prop: 'remove-upload',
    req: '../meta/remove-resource-objectId',
    resource: 'upload',
    servicePath: '/uploads'
  },
  {
    prop: 'update-upload',
    req: '../meta/update-resource',
    resource: 'upload',
    servicePath: '/uploads'
  }
]

module.exports = ctx => {
  const { style } = ctx
  const tasks = {}

  COMMANDS.forEach(cmd => {
    Object.defineProperty(tasks, cmd.prop, {
      get: () => require(path.join(__dirname, cmd.req))(ctx, cmd)
    })
  })

  return {
    help(p) {
      return style.commandHelp(
        {
          title: 'Utility command help:',
          synopsis: [
            { lbl: 'util', cmd: '<sub>', opts: '[<options>] [<args>]' },
            {},
            {
              lbl: 'util',
              cmd: 'get-*',
              opts: '--id=<id> [--file=<file> | --save] [--output=color|indent|raw]'
            },
            {
              lbl: 'util',
              cmd: 'list-*',
              opts: '[--query=<query>] [--<field>[:<op>]=<value> ...] [--limit=<int>] [--sort[:desc]=<field>] [--file=<file>] [--output=table|color|indent|raw]'
            },
            {},
            {
              lbl: 'util',
              cmd: 'create-*',
              opts: '[--id=<id>] [--file=<file>] [--save] [--output=color|indent|raw]'
            },
            {
              lbl: 'util',
              cmd: 'update-*',
              opts: '[--id=<id>] [--file=<file>] [--save] [--output=color|indent|raw]'
            },
            {
              lbl: 'util',
              cmd: 'remove-*',
              opts: '--id=<id> [--deep] [--confirm] [--confirm-deep] [--file=<file> | --save] [--output=indent|raw] [--verbose]'
            },
            {},
            {
              lbl: 'util',
              cmd: 'patch-*',
              opts: '[--query=<query>] [--<field>[:<op>]=<value> ...] [--limit=<int>] [--sort[:desc]=<field>] [--jsonata=<jsonata>] [--output=indent|raw] [--dry-run] [--verbose]'
            }
          ],
          groups: [
            {
              header: 'Common Options',
              items: [
                {
                  opts: '--id=<id>',
                  desc: 'Unique identifier of a resource, can be an ObjectId'
                },
                {
                  opts: '--file=<file>',
                  desc: 'Name of file to load from or save to'
                },
                {
                  opts: '--save',
                  desc: 'Write the response of this command back to a file'
                },
                {
                  opts: '--output=<format>',
                  desc: 'Override the default output format'
                },
                { opts: '--verbose', desc: 'Output additional messages' }
              ]
            },
            {
              header: 'Query Options',
              items: [
                {
                  opts: '--query=<query>',
                  desc: 'JSON query conditions (URI encoded)'
                },
                {
                  opts: '--<field>[:<op>]=<value>',
                  desc: 'One or more field/operator conditions (URI encoded)'
                },
                {
                  opts: '--limit=<int>',
                  desc: 'Maximum number of records to return (max 2000)'
                },
                { opts: '--sort[:desc]=<field>', desc: 'Sort records by field' }
              ]
            },
            {
              header: 'Remove Options',
              items: [
                {
                  opts: '--confirm',
                  desc: 'Suppress confirmation prompt (set --confirm=false for "no")'
                }
              ]
            },
            {
              header: 'Patch Options',
              items: [
                {
                  opts: '--dir=<dir>',
                  desc: 'Name of directory to save files to'
                },
                {
                  opts: '--filespec=<filespec>',
                  desc: 'Pattern to match one or more files'
                },
                {
                  opts: '--jsonata=<jsonata>',
                  desc: 'Name of file containing a JSONata expression (https://jsonata.org/)'
                },
                {
                  opts: '--only=<verb>',
                  desc: 'Restrict uploading to create or update'
                },
                {
                  opts: '--any-suffix',
                  desc: 'Process all matching files (don\'t require "*.<resource>.json")'
                },
                {
                  opts: '--dry-run',
                  desc: 'Process files and records without doing anything'
                }
              ]
            },
            {
              header: 'Subcommands',
              items: [
                {
                  cmd: 'get-<resource>',
                  desc: 'Fetch a <resource> having <id>'
                },
                {
                  cmd: 'list-<resources>',
                  desc: 'Find <resources> matching <query> or fields'
                },
                {
                  cmd: 'create-<resource>',
                  desc: 'Insert a new <resource> from <file> or "<id>.<resource>.json"'
                },
                {
                  cmd: 'update-<resource>',
                  desc: 'Replace <resource> from <file> or "<id>.<resource>.json"'
                },
                { cmd: 'remove-<resource>', desc: 'Destroy <resource> <id>' },
                {
                  cmd: 'patch-uploads',
                  desc: 'Patch matching uploads using <jsonata> or "patch.upload.jsonata"'
                }
              ]
            },
            {
              header: 'Resources',
              items: [
                {
                  lbl: 'download[s]',
                  desc: 'A specification for one or more resources to be downloaded from the system'
                },
                {
                  lbl: 'monitor[s]',
                  desc: 'A specification for automated monitoring of resources or system components'
                },
                {
                  lbl: 'upload[s]',
                  desc: 'A specification for one or more resources to be uploaded into the system'
                }
              ]
            }
          ]
        },
        p
      )
    },

    tasks
  }
}
