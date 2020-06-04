"use strict";

const path = require('path');

const COMMANDS = [{
  prop: 'create-annotation',
  req: 'create-resource',
  resource: 'annotation',
  servicePath: '/annotations'
}, {
  prop: 'get-annotation',
  req: 'get-resource-objectId',
  resource: 'annotation',
  servicePath: '/annotations'
}, {
  prop: 'list-annotations',
  req: 'list-annotations'
}, {
  prop: 'patch-annotations',
  req: 'patch-resources',
  resource: 'annotation',
  servicePath: '/annotations',
  title: 'Annotations'
}, {
  prop: 'pull-annotations',
  req: 'pull-resources',
  resource: 'annotation',
  servicePath: '/annotations',
  title: 'Annotations'
}, {
  prop: 'push-annotations',
  req: 'push-resources',
  resource: 'annotation',
  servicePath: '/annotations',
  title: 'Annotations'
}, {
  prop: 'remove-annotation',
  req: 'remove-resource-objectId',
  resource: 'annotation',
  servicePath: '/annotations'
}, {
  prop: 'update-annotation',
  req: 'update-resource',
  resource: 'annotation',
  servicePath: '/annotations'
}, {
  prop: 'clone-dashboard',
  req: 'clone-dashboard'
}, {
  prop: 'create-dashboard',
  req: 'create-resource',
  resource: 'dashboard',
  servicePath: '/dashboards'
}, {
  prop: 'get-dashboard',
  req: 'get-resource-objectId',
  resource: 'dashboard',
  servicePath: '/dashboards'
}, {
  prop: 'list-dashboards',
  req: 'list-dashboards'
}, {
  prop: 'patch-dashboards',
  req: 'patch-resources',
  resource: 'dashboard',
  servicePath: '/dashboards',
  title: 'Dashboards'
}, {
  prop: 'pull-dashboards',
  req: 'pull-dashboards',
  resource: 'dashboard',
  servicePath: '/dashboards',
  title: 'Dashboards'
}, {
  prop: 'push-dashboards',
  req: 'push-resources',
  resource: 'dashboard',
  servicePath: '/dashboards',
  title: 'Dashboards'
}, {
  prop: 'remove-dashboard',
  req: 'remove-resource-objectId',
  resource: 'dashboard',
  servicePath: '/dashboards'
}, {
  prop: 'update-dashboard',
  req: 'update-resource',
  resource: 'dashboard',
  servicePath: '/dashboards'
}, {
  prop: 'clone-datastream',
  req: 'clone-datastream'
}, {
  prop: 'create-datastream',
  req: 'create-resource',
  resource: 'datastream',
  servicePath: '/datastreams'
}, {
  prop: 'get-datastream',
  req: 'get-resource-objectId',
  resource: 'datastream',
  servicePath: '/datastreams'
}, {
  prop: 'list-datastreams',
  req: 'list-datastreams'
}, {
  prop: 'patch-datastreams',
  req: 'patch-resources',
  resource: 'datastream',
  servicePath: '/datastreams',
  title: 'Datastreams'
}, {
  prop: 'pull-datastreams',
  req: 'pull-resources',
  resource: 'datastream',
  servicePath: '/datastreams',
  title: 'Datastreams'
}, {
  prop: 'push-datastreams',
  req: 'push-resources',
  resource: 'datastream',
  servicePath: '/datastreams',
  title: 'Datastreams'
}, {
  prop: 'remove-datastream',
  req: 'remove-resource-objectId',
  resource: 'datastream',
  servicePath: '/datastreams'
}, {
  prop: 'update-datastream',
  req: 'update-resource',
  resource: 'datastream',
  servicePath: '/datastreams'
}, {
  prop: 'create-membership',
  req: 'create-resource',
  resource: 'membership',
  servicePath: '/memberships'
}, {
  prop: 'get-membership',
  req: 'get-resource-objectId',
  resource: 'membership',
  servicePath: '/memberships'
}, {
  prop: 'list-memberships',
  req: 'list-memberships'
}, {
  prop: 'patch-memberships',
  req: 'patch-resources',
  resource: 'membership',
  servicePath: '/memberships',
  title: 'Memberships'
}, {
  prop: 'pull-memberships',
  req: 'pull-resources',
  resource: 'membership',
  servicePath: '/memberships',
  title: 'Memberships'
}, {
  prop: 'push-memberships',
  req: 'push-resources',
  resource: 'membership',
  servicePath: '/memberships',
  title: 'Memberships'
}, {
  prop: 'remove-membership',
  req: 'remove-resource-objectId',
  resource: 'membership',
  servicePath: '/memberships'
}, {
  prop: 'update-membership',
  req: 'update-resource',
  resource: 'membership',
  servicePath: '/memberships'
}, {
  prop: 'create-organization',
  req: 'create-resource',
  resource: 'organization',
  servicePath: '/organizations'
}, {
  prop: 'get-organization',
  req: 'get-resource-objectId',
  resource: 'organization',
  servicePath: '/organizations'
}, {
  prop: 'list-organizations',
  req: 'list-organizations'
}, {
  prop: 'patch-organizations',
  req: 'patch-resources',
  resource: 'organization',
  servicePath: '/organizations',
  title: 'Organizations'
}, {
  prop: 'pull-organizations',
  req: 'pull-resources',
  resource: 'organization',
  servicePath: '/organizations',
  title: 'Organizations'
}, {
  prop: 'push-organizations',
  req: 'push-resources',
  resource: 'organization',
  servicePath: '/organizations',
  title: 'Organizations'
}, {
  prop: 'remove-organization',
  req: 'remove-resource-objectId',
  resource: 'organization',
  servicePath: '/organizations'
}, {
  prop: 'update-organization',
  req: 'update-resource',
  resource: 'organization',
  servicePath: '/organizations'
}, {
  prop: 'create-person',
  req: 'create-resource',
  resource: 'person',
  servicePath: '/persons'
}, {
  prop: 'get-person',
  req: 'get-resource-objectId',
  resource: 'person',
  servicePath: '/persons'
}, {
  prop: 'list-persons',
  req: 'list-persons'
}, {
  prop: 'patch-persons',
  req: 'patch-resources',
  resource: 'person',
  servicePath: '/persons',
  title: 'Persons'
}, {
  prop: 'pull-persons',
  req: 'pull-resources',
  resource: 'person',
  servicePath: '/persons',
  title: 'Persons'
}, {
  prop: 'push-persons',
  req: 'push-resources',
  resource: 'person',
  servicePath: '/persons',
  title: 'Persons'
}, {
  prop: 'remove-person',
  req: 'remove-resource-objectId',
  resource: 'person',
  servicePath: '/persons'
}, {
  prop: 'update-person',
  req: 'update-resource',
  resource: 'person',
  servicePath: '/persons'
}, {
  prop: 'create-place',
  req: 'create-resource',
  resource: 'place',
  servicePath: '/places'
}, {
  prop: 'get-place',
  req: 'get-resource-objectId',
  resource: 'place',
  servicePath: '/places'
}, {
  prop: 'list-places',
  req: 'list-places'
}, {
  prop: 'patch-places',
  req: 'patch-resources',
  resource: 'place',
  servicePath: '/places',
  title: 'Places'
}, {
  prop: 'pull-places',
  req: 'pull-resources',
  resource: 'place',
  servicePath: '/places',
  title: 'Places'
}, {
  prop: 'push-places',
  req: 'push-resources',
  resource: 'place',
  servicePath: '/places',
  title: 'Places'
}, {
  prop: 'remove-place',
  req: 'remove-resource-objectId',
  resource: 'place',
  servicePath: '/places'
}, {
  prop: 'update-place',
  req: 'update-resource',
  resource: 'place',
  servicePath: '/places'
}, {
  prop: 'create-scheme',
  req: 'create-resource',
  resource: 'scheme',
  servicePath: '/schemes'
}, {
  prop: 'get-scheme',
  req: 'get-resource-objectId',
  resource: 'scheme',
  servicePath: '/schemes'
}, {
  prop: 'list-schemes',
  req: 'list-schemes'
}, {
  prop: 'patch-schemes',
  req: 'patch-resources',
  resource: 'scheme',
  servicePath: '/schemes',
  title: 'Schemes'
}, {
  prop: 'pull-schemes',
  req: 'pull-resources',
  resource: 'scheme',
  servicePath: '/schemes',
  title: 'Schemes'
}, {
  prop: 'push-schemes',
  req: 'push-resources',
  resource: 'scheme',
  servicePath: '/schemes',
  title: 'Schemes'
}, {
  prop: 'remove-scheme',
  req: 'remove-resource-objectId',
  resource: 'scheme',
  servicePath: '/schemes'
}, {
  prop: 'update-scheme',
  req: 'update-resource',
  resource: 'scheme',
  servicePath: '/schemes'
}, {
  prop: 'create-som',
  req: 'create-resource',
  resource: 'som',
  servicePath: '/soms'
}, {
  prop: 'get-som',
  req: 'get-resource-objectId',
  resource: 'som',
  servicePath: '/soms'
}, {
  prop: 'list-soms',
  req: 'list-soms'
}, {
  prop: 'patch-soms',
  req: 'patch-resources',
  resource: 'som',
  servicePath: '/soms',
  title: 'SOMs'
}, {
  prop: 'pull-soms',
  req: 'pull-resources',
  resource: 'som',
  servicePath: '/soms',
  title: 'SOMs'
}, {
  prop: 'push-soms',
  req: 'push-resources',
  resource: 'som',
  servicePath: '/soms',
  title: 'SOMs'
}, {
  prop: 'remove-som',
  req: 'remove-resource-objectId',
  resource: 'som',
  servicePath: '/soms'
}, {
  prop: 'update-som',
  req: 'update-resource',
  resource: 'som',
  servicePath: '/soms'
}, {
  prop: 'clone-station',
  req: 'clone-station'
}, {
  prop: 'create-station',
  req: 'create-resource',
  resource: 'station',
  servicePath: '/stations'
}, {
  prop: 'get-station',
  req: 'get-resource-objectId',
  resource: 'station',
  servicePath: '/stations'
}, {
  prop: 'list-stations',
  req: 'list-stations'
}, {
  prop: 'patch-stations',
  req: 'patch-resources',
  resource: 'station',
  servicePath: '/stations',
  title: 'Stations'
}, {
  prop: 'pull-stations',
  req: 'pull-resources',
  resource: 'station',
  servicePath: '/stations',
  title: 'Stations'
}, {
  prop: 'push-stations',
  req: 'push-resources',
  resource: 'station',
  servicePath: '/stations',
  title: 'Stations'
}, {
  prop: 'remove-station',
  req: 'remove-station'
}, {
  prop: 'update-station',
  req: 'update-resource',
  resource: 'station',
  servicePath: '/stations'
}, {
  prop: 'create-thing',
  req: 'create-resource',
  resource: 'thing',
  servicePath: '/things'
}, {
  prop: 'get-thing',
  req: 'get-resource-objectId',
  resource: 'thing',
  servicePath: '/things'
}, {
  prop: 'list-things',
  req: 'list-things'
}, {
  prop: 'pull-things',
  req: 'pull-resources',
  resource: 'thing',
  servicePath: '/things',
  title: 'Things'
}, {
  prop: 'patch-things',
  req: 'patch-resources',
  resource: 'thing',
  servicePath: '/things',
  title: 'Things'
}, {
  prop: 'push-things',
  req: 'push-resources',
  resource: 'thing',
  servicePath: '/things',
  title: 'Things'
}, {
  prop: 'remove-thing',
  req: 'remove-resource-objectId',
  resource: 'thing',
  servicePath: '/things'
}, {
  prop: 'update-thing',
  req: 'update-resource',
  resource: 'thing',
  servicePath: '/things'
}, {
  prop: 'create-thing-type',
  req: 'create-resource',
  resource: 'thing-type',
  servicePath: '/thing-types'
}, {
  prop: 'get-thing-type',
  req: 'get-resource-objectId',
  resource: 'thing-type',
  servicePath: '/thing-types'
}, {
  prop: 'list-thing-types',
  req: 'list-thing-types'
}, {
  prop: 'pull-thing-types',
  req: 'pull-resources',
  resource: 'thing-type',
  servicePath: '/thing-types',
  title: 'Thing Types'
}, {
  prop: 'patch-thing-types',
  req: 'patch-resources',
  resource: 'thing-type',
  servicePath: '/thing-types',
  title: 'Thing Types'
}, {
  prop: 'push-thing-types',
  req: 'push-resources',
  resource: 'thing-type',
  servicePath: '/thing-types',
  title: 'Thing Types'
}, {
  prop: 'remove-thing-type',
  req: 'remove-resource-objectId',
  resource: 'thing-type',
  servicePath: '/thing-types'
}, {
  prop: 'update-thing-type',
  req: 'update-resource',
  resource: 'thing-type',
  servicePath: '/thing-types'
}, {
  prop: 'create-uom',
  req: 'create-resource',
  resource: 'uom',
  servicePath: '/uoms'
}, {
  prop: 'get-uom',
  req: 'get-resource-objectId',
  resource: 'uom',
  servicePath: '/uoms'
}, {
  prop: 'list-uoms',
  req: 'list-uoms'
}, {
  prop: 'patch-uoms',
  req: 'patch-resources',
  resource: 'uom',
  servicePath: '/uoms',
  title: 'UOMs'
}, {
  prop: 'pull-uoms',
  req: 'pull-resources',
  resource: 'uom',
  servicePath: '/uoms',
  title: 'UOMs'
}, {
  prop: 'push-uoms',
  req: 'push-resources',
  resource: 'uom',
  servicePath: '/uoms',
  title: 'UOMs'
}, {
  prop: 'remove-uom',
  req: 'remove-resource-objectId',
  resource: 'uom',
  servicePath: '/uoms'
}, {
  prop: 'update-uom',
  req: 'update-resource',
  resource: 'uom',
  servicePath: '/uoms'
}, {
  prop: 'create-user',
  req: 'create-resource',
  resource: 'user',
  servicePath: '/users'
}, {
  prop: 'get-user',
  req: 'get-resource-objectId',
  resource: 'user',
  servicePath: '/users'
}, {
  prop: 'list-users',
  req: 'list-users'
}, {
  prop: 'patch-users',
  req: 'patch-resources',
  resource: 'user',
  servicePath: '/users',
  title: 'Users'
}, {
  prop: 'pull-users',
  req: 'pull-resources',
  resource: 'user',
  servicePath: '/users',
  title: 'Users'
}, {
  prop: 'push-users',
  req: 'push-resources',
  resource: 'user',
  servicePath: '/users',
  title: 'Users'
}, {
  prop: 'remove-user',
  req: 'remove-resource-objectId',
  resource: 'user',
  servicePath: '/users'
}, {
  prop: 'update-user',
  req: 'update-resource',
  resource: 'user',
  servicePath: '/users'
}, {
  prop: 'create-vocabulary',
  req: 'create-resource',
  resource: 'vocabulary',
  servicePath: '/vocabularies'
}, {
  prop: 'get-vocabulary',
  req: 'get-resource-objectId',
  resource: 'vocabulary',
  servicePath: '/vocabularies'
}, {
  prop: 'list-vocabularies',
  req: 'list-vocabularies'
}, {
  prop: 'patch-vocabularies',
  req: 'patch-resources',
  resource: 'vocabulary',
  servicePath: '/vocabularies',
  title: 'Vocabularies'
}, {
  prop: 'pull-vocabularies',
  req: 'pull-resources',
  resource: 'vocabulary',
  servicePath: '/vocabularies',
  title: 'Vocabularies'
}, {
  prop: 'push-vocabularies',
  req: 'push-resources',
  resource: 'vocabulary',
  servicePath: '/vocabularies',
  title: 'Vocabularies'
}, {
  prop: 'remove-vocabulary',
  req: 'remove-resource-objectId',
  resource: 'vocabulary',
  servicePath: '/vocabularies'
}, {
  prop: 'update-vocabulary',
  req: 'update-resource',
  resource: 'vocabulary',
  servicePath: '/vocabularies'
}];

module.exports = ctx => {
  const {
    style
  } = ctx;
  const tasks = {};
  COMMANDS.forEach(cmd => {
    Object.defineProperty(tasks, cmd.prop, {
      get: () => require(path.join(__dirname, cmd.req))(ctx, cmd)
    });
  });
  return {
    help(p) {
      return style.commandHelp({
        title: 'Metadata command help:',
        synopsis: [{
          lbl: 'meta',
          cmd: '<sub>',
          opts: '[<options>] [<args>]'
        }, {}, {
          lbl: 'meta',
          cmd: 'get-*',
          opts: '--id=<id> [--file=<file> | --save] [--output=color|indent|raw]'
        }, {
          lbl: 'meta',
          cmd: 'list-*',
          opts: '[--query=<query>] [--<field>[:<op>]=<value> ...] [--limit=<int>] [--sort[:desc]=<field>] [--file=<file>] [--output=table|color|indent|raw]'
        }, {}, {
          lbl: 'meta',
          cmd: 'create-*',
          opts: '[--id=<id>] [--file=<file>] [--save] [--output=color|indent|raw]'
        }, {
          lbl: 'meta',
          cmd: 'update-*',
          opts: '[--id=<id>] [--file=<file>] [--save] [--output=color|indent|raw]'
        }, {
          lbl: 'meta',
          cmd: 'clone-*',
          opts: '--id=<id> [--deep] [--file=<file> | --save] [--output=indent|raw] [--verbose]'
        }, {
          lbl: 'meta',
          cmd: 'remove-*',
          opts: '--id=<id> [--deep] [--confirm] [--confirm-deep] [--file=<file> | --save] [--output=indent|raw] [--verbose]'
        }, {}, {
          lbl: 'meta',
          cmd: 'patch-*',
          opts: '[--query=<query>] [--<field>[:<op>]=<value> ...] [--limit=<int>] [--sort[:desc]=<field>] [--jsonata=<jsonata>] [--output=indent|raw] [--dry-run] [--verbose]'
        }, {
          lbl: 'meta',
          cmd: 'push-*',
          opts: '--filespec=<filespec> [--save] [--only=create|update] [--any-suffix] [--dry-run] [--verbose]'
        }, {
          lbl: 'meta',
          cmd: 'pull-*',
          opts: '[--query=<query>] [--<field>[:<op>]=<value> ...] [--limit=<int>] [--sort[:desc]=<field>] [--dir=<dir>] [--jsonata=<jsonata>] [--output=indent|raw] [--dry-run] [--verbose]'
        }],
        groups: [{
          header: 'Common Options',
          items: [{
            opts: '--id=<id>',
            desc: 'Unique identifier of a resource, can be an ObjectId'
          }, {
            opts: '--file=<file>',
            desc: 'Name of file to load from or save to'
          }, {
            opts: '--save',
            desc: 'Write the response of this command back to a file'
          }, {
            opts: '--output=<format>',
            desc: 'Override the default output format'
          }, {
            opts: '--verbose',
            desc: 'Output additional messages'
          }]
        }, {
          header: 'Query Options',
          items: [{
            opts: '--query=<query>',
            desc: 'JSON query conditions (URI encoded)'
          }, {
            opts: '--<field>[:<op>]=<value>',
            desc: 'One or more field/operator conditions (URI encoded)'
          }, {
            opts: '--limit=<int>',
            desc: 'Maximum number of records to return (max 2000)'
          }, {
            opts: '--sort[:desc]=<field>',
            desc: 'Sort records by field'
          }]
        }, {
          header: 'Clone/Remove Options',
          items: [{
            opts: '--deep',
            desc: 'Process this resource and all associated child resources'
          }, {
            opts: '--confirm',
            desc: 'Suppress confirmation prompt (set --confirm=false for "no")'
          }, {
            opts: '--confirm-deep',
            desc: 'Suppress deep confirmation prompt (set --confirm-deep=false for "no")'
          }]
        }, {
          header: 'Patch/Push/Pull Options',
          items: [{
            opts: '--dir=<dir>',
            desc: 'Name of directory to save files to'
          }, {
            opts: '--filespec=<filespec>',
            desc: 'Pattern to match one or more files'
          }, {
            opts: '--jsonata=<jsonata>',
            desc: 'Name of file containing a JSONata expression (https://jsonata.org/)'
          }, {
            opts: '--only=<verb>',
            desc: 'Restrict uploading to create or update'
          }, {
            opts: '--any-suffix',
            desc: 'Process all matching files (don\'t require "*.<resource>.json")'
          }, {
            opts: '--dry-run',
            desc: 'Process files and records without doing anything'
          }]
        }, {
          header: 'Subcommands',
          items: [{
            cmd: 'get-<resource>',
            desc: 'Fetch a <resource> having <id>'
          }, {
            cmd: 'list-<resources>',
            desc: 'Find <resources> matching <query> or fields'
          }, {
            cmd: 'clone-dashboard',
            desc: 'Clone dashboard <id>'
          }, {
            cmd: 'clone-datastream',
            desc: 'Clone datastream <id>'
          }, {
            cmd: 'clone-station',
            desc: 'Clone station <id>'
          }, {
            cmd: 'create-<resource>',
            desc: 'Insert a new <resource> from <file> or "<id>.<resource>.json"'
          }, {
            cmd: 'update-<resource>',
            desc: 'Replace <resource> from <file> or "<id>.<resource>.json"'
          }, {
            cmd: 'remove-<resource>',
            desc: 'Destroy <resource> <id>'
          }, {
            cmd: 'patch-<resources>',
            desc: 'Patch matching <resources> using <jsonata> or "patch.<resource>.jsonata"'
          }, {
            cmd: 'push-<resources>',
            desc: 'Upload <resources> from files matching <filespec> (create or update)'
          }, {
            cmd: 'pull-<resources>',
            desc: 'Download matching <resources> into <dir>'
          }]
        }, {
          header: 'Resources',
          items: [{
            lbl: 'annotation[s]',
            desc: 'A note with optional actions to apply against a range of datapoints'
          }, {
            lbl: 'dashboard[s]',
            desc: 'A collection of graphs and widgets displaying realtime data'
          }, {
            lbl: 'datastream[s]',
            desc: 'A continuous series of datapoints indexed in time order'
          }, {
            lbl: 'membership[s]',
            desc: 'An affiliation between a person and an organization'
          }, {
            lbl: 'organization[s]',
            desc: 'An association, group, or research organization'
          }, {
            lbl: 'person[s]',
            desc: 'A data consumer, responsible party, or user of the system'
          }, {
            lbl: 'place[s]',
            desc: 'A specific, named location with corresponding geo coordinates'
          }, {
            lbl: 'scheme[s]',
            desc: 'A namespace (scheme) for one or more controlled vocabularies'
          }, {
            lbl: 'som[s]',
            desc: 'A collection of units of measurement'
          }, {
            lbl: 'station[s]',
            desc: 'An observation post where data is measured and collected'
          }, {
            lbl: 'thing[s]',
            desc: 'An specific instrument or other equipment that is deployed'
          }, {
            lbl: 'thing-type[s]',
            desc: 'A make and model of instrument or other equipment'
          }, {
            lbl: 'uom[s]',
            desc: 'A quantity used as a standard of measurement'
          }, {
            lbl: 'user[s]',
            desc: 'A user account with credentials for authentication'
          }, {
            lbl: 'vocabular(y|ies)',
            desc: 'A controlled vocabulary used to tag data producing entities'
          }]
        }]
      }, p);
    },

    tasks
  };
};