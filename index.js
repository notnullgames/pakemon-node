import r from 'raylib'

import * as SceneGamesTop from './scenes/games_top.js'

r.SetTraceLogLevel(r.LOG_ERROR)
r.InitWindow(320, 240, 'Pakémon')
r.SetTargetFPS(60)

r.SetGamepadMappings(`
030000005e0400008502000000010000,Microsoft Xbox,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,leftshoulder:b5,leftstick:b8,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b2,rightstick:b9,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b3,y:b4,platform:Linux,
030000005e0400008e02000001000000,Microsoft Xbox 360,a:b0,b:b1,back:b6,dpdown:h0.1,dpleft:h0.2,dpright:h0.8,dpup:h0.4,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e0400008e02000004010000,Microsoft Xbox 360,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e0400008e02000056210000,Microsoft Xbox 360,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e0400008e02000062230000,Microsoft Xbox 360,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e040000d102000001010000,Microsoft Xbox One,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e040000d102000003020000,Microsoft Xbox One,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
060000005e040000120b000009050000,Microsoft Xbox One,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e040000120b00000b050000,Microsoft Xbox One,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e040000dd02000003020000,Microsoft Xbox One 2015,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e040000e302000003020000,Microsoft Xbox One Elite,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e040000000b000008040000,Microsoft Xbox One Elite 2,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
050000005e040000050b000003090000,Microsoft Xbox One Elite 2,a:b0,b:b1,back:b17,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b12,leftshoulder:b6,leftstick:b13,lefttrigger:a6,leftx:a0,lefty:a1,rightshoulder:b7,rightstick:b14,righttrigger:a5,rightx:a2,righty:a3,start:b11,x:b3,y:b4,platform:Linux,
030000005e040000ea02000008040000,Microsoft Xbox One S,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,guide:b8,leftshoulder:b4,leftstick:b9,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b5,rightstick:b10,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b2,y:b3,platform:Linux,
030000005e0400008902000021010000,Microsoft Xbox pad v2,a:b0,b:b1,back:b6,dpdown:h0.4,dpleft:h0.8,dpright:h0.2,dpup:h0.1,leftshoulder:b5,leftstick:b8,lefttrigger:a2,leftx:a0,lefty:a1,rightshoulder:b2,rightstick:b9,righttrigger:a5,rightx:a3,righty:a4,start:b7,x:b3,y:b4,platform:Linux,
`)

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
  UP: { gamepad: 99, key: r.KEY_UP },
  DOWN: { gamepad: 99, key: r.KEY_DOWN },
  LEFT: { gamepad: 99, key: r.KEY_LEFT },
  RIGHT: { gamepad: 99, key: r.KEY_RIGHT }
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
2 - GAMEPAD_BUTTON_LEFT_FACE_RIGHT
3 - GAMEPAD_BUTTON_LEFT_FACE_DOWN
4 - GAMEPAD_BUTTON_LEFT_FACE_LEFT

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

    r.DrawText(r.GetGamepadButtonPressed().toString(), 310, 10, 8, r.WHITE)

    r.EndDrawing()
  }
}, 10)
