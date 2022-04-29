import r from 'raylib'
import { basename } from 'path'
import { readFileSync } from 'fs'
import { globbySync } from 'globby'
import { exec } from 'child_process'

import * as SceneGamesTop from '../scenes/games_top.js'

const systems = JSON.parse(readFileSync('games/systems.json').toString())

let romFiles
let romNames = []
let currentItem = 0
let currentSystem

function runCommand (command) {
  return new Promise((resolve, reject) => {
    globalThis.shouldClose = true
    exec(command, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        return reject(error)
      }
      if (stderr) {
        console.error(stderr.toString())
      }
      if (stdout) {
        console.log(stdout.toString())
      }
      resolve({ stdout, stderr })
    })
  })
}

async function run () {
  const ext = romFiles[currentItem].split('.').pop()
  const c = Object.values(systems).findIndex(exts => exts.includes(ext))
  if (c !== -1) {
    const core = Object.keys(systems)[c]
    console.log(`Running ${romFiles[currentItem]} with core ${core}`)
    if (core === 'node-raylib') {
      global.switchScene(await import(`../${romFiles[currentItem]}`))
    } else if (core === 'shell') {
      runCommand(`./${romFiles[currentItem]}`)
    } else {
      let command = 'retroarch'
      let coreName = ''

      if (process.platform === 'darwin') {
        command = '/Applications/RetroArch.app/Contents/MacOS/RetroArch'
        coreName = `"${process.env.HOME}/Library/Application Support/RetroArch/cores/${core}_libretro.dylib"`
      }

      runCommand([
        command,
        '--fullscreen',
        '-L', coreName,
        `"${romFiles[currentItem]}"`
      ].join(' '))
    }
  } else {
    console.log(`Core not found for ${romFiles[currentItem]}`)
  }
}

export function init ({ system }) {
  currentSystem = system
  currentItem = 0
  romFiles = globbySync(`games/${system}/roms/*`)
  romNames = romFiles.map(r => basename(r).split('.')[0]).filter(t => t.trim() !== '')
}

export function draw () {
  const page = Math.floor(currentItem / 18)
  const pageStart = page * 18

  r.ClearBackground(r.BLACK)
  if (romNames.length > 0) {
    r.DrawRectangle(0, 10 + ((currentItem % 18) * 12), 320, 10, r.BLUE)
    for (let i = pageStart; i < (pageStart + 17); i++) {
      if (i < romNames.length) {
        r.DrawText(romNames[i], 10, 10 + ((i % 18) * 12), 8, r.WHITE)
      }
    }
  } else {
    r.DrawText(`No roms for ${currentSystem}.`, 10, 10, 8, r.WHITE)
  }
}

export function buttonPress (button) {
  if (button === 'B') {
    global.switchScene(SceneGamesTop)
  }

  if (button === 'A') {
    run()
  }

  if (button === 'DOWN') {
    currentItem += 1
  }

  if (button === 'UP') {
    currentItem -= 1
  }

  if (currentItem < 0) {
    currentItem = currentItem ? (romNames.length - 1) : 0
  }
  if ((currentItem + 1) > romNames.length) {
    currentItem = 0
  }
}

export function buttonRelease (button) {
}
