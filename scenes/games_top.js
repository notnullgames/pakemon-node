import r from 'raylib'
import { globbySync } from 'globby'
import * as SceneGamesList from '../scenes/games_list.js'

let systems = []
let icons = []
let currentItem = 0

export function init () {
  const iconFiles = globbySync('games/*/icon.png', { expandDirectories: false })
  systems = iconFiles.map(i => i.replace(/^games\//, '').replace(/\/icon\.png$/, ''))
  icons = iconFiles.map(i => r.LoadTexture(i))
}

export function draw () {
  r.ClearBackground(r.BLACK)
  if (systems[currentItem]) {
    const textwidth = r.MeasureText(systems[currentItem], 30)
    const icon = icons[currentItem]
    r.DrawText(systems[currentItem], 160 - (textwidth / 2), 20, 30, r.WHITE)
    r.DrawTexture(icon, 160 - (icon.width / 2), 120 - (icon.width / 2), r.WHITE)
  }
}

export function buttonPress (button) {
  if (button === 'A') {
    global.switchScene(SceneGamesList, { system: systems[currentItem] })
  }
  if (button === 'LEFT') {
    currentItem -= 1
  }
  if (button === 'RIGHT') {
    currentItem += 1
  }
  if (currentItem >= systems.length) {
    currentItem = 0
  }
  if (currentItem < 0) {
    currentItem = systems.length - 1
  }
}

export function buttonRelease (button) {
}
