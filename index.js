import r from 'raylib'

import * as SceneGamesTop from './scenes/games_top.js'

r.SetTraceLogLevel(r.LOG_ERROR)
r.InitWindow(320, 240, 'Pakémon')
r.SetTargetFPS(60)

// https://docs.libretro.com/guides/input-and-controls/
const mappedInput = {
  A: { gamepad: 0, key: r.KEY_X },
  B: { gamepad: 1, key: r.KEY_Z },
  X: { gamepad: 2, key: r.KEY_S },
  Y: { gamepad: 3, key: r.KEY_A },
  L: { gamepad: 4, key: r.KEY_Q },
  R: { gamepad: 5, key: r.KEY_W },
  SELECT: { gamepad: 6, key: r.KEY_LEFT_SHIFT },
  START: { gamepad: 7, key: r.KEY_ENTER },
  UP: { key: r.KEY_UP },
  DOWN: { key: r.KEY_DOWN },
  LEFT: { key: r.KEY_LEFT },
  RIGHT: { key: r.KEY_RIGHT }
}

/*
use these, at some point, make sure buttons are setup right:

14 - GAMEPAD_BUTTON_MIDDLE
15 - GAMEPAD_BUTTON_MIDDLE_RIGHT
13 - GAMEPAD_BUTTON_MIDDLE_LEFT

8 - GAMEPAD_BUTTON_RIGHT_FACE_LEFT
7 - GAMEPAD_BUTTON_RIGHT_FACE_DOWN
6 - GAMEPAD_BUTTON_RIGHT_FACE_RIGHT
5 - GAMEPAD_BUTTON_RIGHT_FACE_UP

1 - GAMEPAD_BUTTON_LEFT_FACE_UP
3 - GAMEPAD_BUTTON_LEFT_FACE_DOWN
4 - GAMEPAD_BUTTON_LEFT_FACE_LEFT
2 - GAMEPAD_BUTTON_LEFT_FACE_RIGHT

9 - GAMEPAD_BUTTON_LEFT_TRIGGER_1
11 - GAMEPAD_BUTTON_RIGHT_TRIGGER_1
*/

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

function exit () {
  globalThis.shouldClose = true
  clearInterval(interval)
  if (currentScene?.destroy) {
    currentScene.destroy()
  }
  r.CloseWindow()
}

// I do a weird interval to make the game-loop work better with async
const interval = setInterval(() => {
  if (r.WindowShouldClose() || globalThis.shouldClose) {
    return exit()
  } else {
    // on keyboard exit on START + SELECT
    if (r.IsKeyPressed(mappedInput.START.key) && r.IsKeyPressed(mappedInput.SELECT.key)) {
      return exit()
    }
    if (r.IsGamepadAvailable(0)) {
      // on joystick exit on START + SELECT
      if (r.IsGamepadButtonDown(0, mappedInput.START.gamepad) && r.IsGamepadButtonDown(0, mappedInput.SELECT.gamepad)) {
        return exit()
      }
      for (const b of Object.keys(mappedInput)) {
        if (currentScene.buttonPress && r.IsGamepadButtonPressed(0, mappedInput[b].gamepad)) {
          currentScene.buttonPress(b)
        }
        if (currentScene.buttonRelease && r.IsGamepadButtonReleased(0, mappedInput[b].gamepad)) {
          currentScene.buttonRelease(b)
        }
      }
    }

    for (const b of Object.keys(mappedInput)) {
      if (currentScene.buttonPress && r.IsKeyPressed(mappedInput[b].key)) {
        currentScene.buttonPress(b)
      }
      if (currentScene.buttonRelease && r.IsKeyReleased(mappedInput[b].key)) {
        currentScene.buttonRelease(b)
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
}, 10)
