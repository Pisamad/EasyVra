/** set of tools for debug purpose
 *
 */

const fs = require('fs')
const os = require('os')
const path = require('path')
const nodeConsole = require('console')

export const Debug = {
  log
}

const output = fs.createWriteStream(path.join(os.homedir(), '.easyvra', 'stdout.log'))
const errorOutput = fs.createWriteStream(path.join(os.homedir(), '.easyvra', 'stderr.log'))
const logger = new nodeConsole.Console(output, errorOutput)

function log () {
  function formatConsoleDate (date) {
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let milliseconds = date.getMilliseconds()

    return '[' +
      ((hour < 10) ? '0' + hour : hour) +
      ':' +
      ((minutes < 10) ? '0' + minutes : minutes) +
      ':' +
      ((seconds < 10) ? '0' + seconds : seconds) +
      '.' +
      ('00' + milliseconds).slice(-3) +
      ']'
  }

  logger.log(formatConsoleDate(new Date()), ...arguments)
}

let uniqID = 0
let logEnable = (process.env.EZP4_LOG || '').split(';')
log('DEBUG :', logEnable)

export class Trace {
  constructor (level, label, arg, ...args) {
    if (logEnable.indexOf(level) === -1) return
    this.start = Date.now()
    this.level = level
    this.label = label || level
    this.id = uniqID++
    if (arg !== undefined) {
      log(this.label + '(' + this.id + ')', arg, ...args)
    }
  }

  step (...args) {
    if (logEnable.indexOf(this.level) === -1) return
    let delta = Date.now() - this.start
    log(this.label + '(' + this.id + ')', '[' + delta + 'ms]', ...args)
  }
}
