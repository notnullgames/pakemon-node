import r from 'raylib'

import * as SceneGamesTop from './scenes/games_top.js'

r.SetTraceLogLevel(r.LOG_ERROR)
r.InitWindow(320, 240, 'Pakémon')

// later, these will be in upstream node-raylib
export const wait = time => new Promise((resolve, reject) => { setTimeout(resolve, time) })
export async function MaintainFPS (targetFPS) {
  const timetarget = 1 / targetFPS
  const timeframe = r.GetFrameTime()
  const waittime = (timetarget - timeframe) * 2000
  const realFPS = (1 / timeframe) * 2
  if (waittime > 0) {
    await wait(waittime)
  }
  return r.WindowShouldClose() ? false : realFPS
}


// https://docs.libretro.com/guides/input-and-controls/
const mappedInput = {
  A: { button: 0, key: r.KEY_X },
  B: { button: 1, key: r.KEY_Z },
  X: { button: 2, key: r.KEY_S },
  Y: { button: 3, key: r.KEY_A },
  L: { button: 4, key: r.KEY_Q },
  R: { button: 5, key: r.KEY_W },
  SELECT: { button: 6, key: r.KEY_LEFT_SHIFT },
  START: { button: 7, key: r.KEY_ENTER },
  UP: { axis: 0, direction: -1, key: r.KEY_UP },
  DOWN: { axis: 0, direction: 1, key: r.KEY_DOWN },
  LEFT: { axis: 1, direction: -1, key: r.KEY_LEFT },
  RIGHT: { axis: 1, direction: 1, key: r.KEY_RIGHT }
}

let currentScene
globalThis.shouldClose = false

global.switchScene = (scene, params = {}) => {
  if (currentScene?.destroy) {
    currentScene.destroy()
  }
  currentScene = scene
  if (currentScene.init) {
    currentScene.init(params)
  }
}

global.switchScene(SceneGamesTop)

const pushOnce = {}

while(await MaintainFPS(60)) {
  // allow global exit with START + SELECT
  if (
    (r.IsKeyDown(mappedInput.START.key) && r.IsKeyDown(mappedInput.SELECT.key)) ||
    (r.IsGamepadButtonDown(0, mappedInput.START.button) && r.IsGamepadButtonDown(0, mappedInput.SELECT.button))
  ) {
    break
  }

  // map input to callbacks
  for (const button of Object.keys(mappedInput)) {
    if (currentScene.buttonPress) {
      if (typeof mappedInput[button].button !== 'undefined' && r.IsGamepadButtonPressed(0, mappedInput[button].button)) {
        currentScene.buttonPress(button)
      }
      if (typeof mappedInput[button].key !== 'undefined' && r.IsKeyPressed(mappedInput[button].key)) {
        currentScene.buttonPress(button)
      }
      if (typeof mappedInput[button].axis !== 'undefined') {
        if (mappedInput[button].direction === -1 && r.GetGamepadAxisMovement(0, mappedInput[button].axis) < 0 && !pushOnce[mappedInput[button].axis]) {
          pushOnce[mappedInput[button].axis] = true
          currentScene.buttonPress(button)
        }
        if (mappedInput[button].direction === 1 && r.GetGamepadAxisMovement(0, mappedInput[button].axis) > 0 && !pushOnce[mappedInput[button].axis]) {
          pushOnce[mappedInput[button].axis] = true
          currentScene.buttonPress(button)
        }
      }
    }
    
    if (currentScene.buttonRelease) {
      if (typeof mappedInput[button].button !== 'undefined' && r.IsGamepadButtonReleased(0, mappedInput[button].button)) {
        currentScene.buttonRelease(button)
      }
      if (typeof mappedInput[button].key !== 'undefined' && r.IsKeyReleased(mappedInput[button].key)) {
        currentScene.buttonRelease(button)
      }
      if (typeof mappedInput[button].axis !== 'undefined') {
        if (mappedInput[button].direction === -1 && r.GetGamepadAxisMovement(0, mappedInput[button].axis) === 0 && pushOnce[mappedInput[button].axis]) {
          pushOnce[mappedInput[button].axis] = false
          currentScene.buttonRelease(button)
        }
        if (mappedInput[button].direction === 1 && r.GetGamepadAxisMovement(0, mappedInput[button].axis) === 0 && pushOnce[mappedInput[button].axis]) {
          pushOnce[mappedInput[button].axis] = false
          currentScene.buttonRelease(button)
        }
      }
    }
  }

  if (currentScene.update) {
    currentScene.update()
  }

  r.BeginDrawing()
  
  if (currentScene.draw) {
    currentScene.draw()
  }

  r.EndDrawing()
}

if (currentScene.destroy) {
  currentScene.destroy()
}

r.CloseWindow()
