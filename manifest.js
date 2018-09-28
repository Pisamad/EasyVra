const pkg = require('./package.json')

module.exports = ({mode = 'development'}) => {
  const value = {
    author: pkg.author,
    description: pkg.description,
    name: pkg.name,
    version: pkg.version,
    copyright: pkg.copyright,
    support: pkg.support,
    mode: mode,
    build: process.env.buildNumber || 0

  }
  return {
    code: 'module.exports = ' + JSON.stringify(value)
  }
}
