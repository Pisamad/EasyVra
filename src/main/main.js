import program from 'commander'
import manifest from 'src/../manifest'

program._name = manifest.name
let gui = false

program
  .version(manifest.version, '-v, --version')
  .option('-d, --debug', 'Debug mode. Add log info.', () => {
    process.env.EZP4_LOG = 'P4'
  })
//  .option('-p, --port <p4port>', 'P4 port (P4PORT) setting. Default from the P4 env or EasyP4 config.')
//  .option('-u, --user <p4user>', 'P4 user (P4USER) setting. Default from the P4 env or EasyP4 config.')

/*
program
  .command('creatmodule <module>')
  .alias('cm')
  .description('Create module')
  .action((module, cmd) => {
    console.log('NOT IMPLEMENTED : create module ' + module)
  })

program
  .command('creatclient <codeline>')
  .alias('cc')
  .option('--client <client>', 'Client Name. Default is performed from codeline.')
  .option('-r, --root <root>', 'Root path. Default is current path', process.cwd())
  .option('-s, --sync', 'Synchronize after creation.')
  .description('Create client')
  .action((codeline, cmd) => {
    if (cmd.client === undefined) {
      cmd.client = codeline.slice(2).replace(/\//g, '_')
    }
    console.log('NOT IMPLEMENTED : create client ' + codeline, cmd.client, cmd.root)
  })
*/
program.on('command:*', function () {
  if (program.args.length === 0) {
    gui = true
  } else if ((program.args.length === 1) && (program.args[0] === '.')) {
    gui = true
  } else {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
    program.help()
  }
})

export async function main () {
  process.argv.unshift('x')
  if (process.argv.length === 2) {
    gui = true
  }
  program.parse(process.argv)
  global.__args = program
  return gui
}
