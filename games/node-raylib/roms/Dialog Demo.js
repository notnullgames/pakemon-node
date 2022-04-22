import r from 'raylib'
import * as SceneGamesTop from '../../../scenes/games_top.js'

//   { source: { x: 0, y: 0, width: 64, height: 64 }, left: 12, top: 40, right: 12, bottom: 12, layout: r.NPATCH_NINE_PATCH }
//   { source: { x: 0, y: 128, width: 64, height: 64 }, left: 16, top: 16, right: 16, bottom: 16, layout: r.NPATCH_NINE_PATCH }
//   { source: { x: 0, y: 64, width: 64, height: 64 }, left: 8, top: 8, right: 8, bottom: 8, layout: r.NPATCH_NINE_PATCH }
const defaultPatch = { source: { x: 0, y: 192, height: 64, width: 64 }, left: 6, top: 6, right: 6, bottom: 6, layout: r.NPATCH_NINE_PATCH }

export function drawDialog (text, options) {
  const { more, texture = r.LoadTexture('assets/ninepatch.png'), position = { x: 10, y: 150, width: 300, height: 80 }, speed = 2, patch = defaultPatch, fontSize = 12, color = r.WHITE } = options

  r.DrawTextureNPatch(
    texture,
    patch,
    position,
    { x: 0, y: 0 },
    0,
    r.WHITE
  )

  // TODO: implement something like
  // https://github.com/raysan5/raylib/blob/master/examples/text/text_rectangle_bounds.c
  r.DrawText(text, position.x + 10, position.y + 15, fontSize, r.WHITE)

  if (more && Math.floor(r.GetTime() * speed) % 2 === 0) {
    r.DrawRectangle(position.x + position.width - 15, position.y + position.height - 15, 5, 5, r.WHITE)
  }
}

let currentMessage = 0
const messages = [
  'Hi.\nThis is a basic dialog. You will need to manage\nyour own layout & input. (press A)',
  'This example is in dialog_test. It shows how to\nprogress through some info.',
  'It\'s not a super-fancy dialog, but it\'s got the\nbasics.\nYou can call it with drawDialog() in utils.',
  'OK.\nBye for now. Have fun. (B to go back)'
]

export function draw () {
  r.ClearBackground(r.BLACK)
  drawDialog(messages[currentMessage], { more: currentMessage < (messages.length - 1) })
}

export function buttonPress (button) {
  if (button === 'A' && (currentMessage + 1) < messages.length) {
    currentMessage += 1
  }
  if (button === 'B' && (currentMessage + 1) === messages.length) {
    global.switchScene(SceneGamesTop)
  }
}

export function update () {}

export function destroy () {}
