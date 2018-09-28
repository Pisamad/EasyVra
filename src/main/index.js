'use strict'

import {app, BrowserWindow} from 'electron'
import {main} from './main'
import manifest from 'src/../manifest'

import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
//  ? `http://localhost:8080`
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 1024,
    minHeight: 600,
    title: manifest.title,
    icon: '@/assets/easyvra.ico',
    // webPreferences: { allowRunningInsecureContent: true, webSecurity: false, nodeIntegration: false }
    webPreferences: { allowRunningInsecureContent: true, webSecurity: false }
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.commandLine.appendSwitch('ignore-certificate-errors')

app.on('ready', async () => {
  let gui = await main()
  if (gui) {
    createWindow()
  } else {
    app.quit()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
