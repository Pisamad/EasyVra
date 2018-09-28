const path = require('path')
const PrjRoot = path.resolve(__dirname, '../')


const GlobalConfig = {
  resolve: {
    alias: {
      'src': path.resolve(PrjRoot, 'src'),
      'app': path.resolve(PrjRoot, 'src/main/app'),
      'test': path.resolve(PrjRoot, 'test')
    }
  }
}

module.exports = GlobalConfig
