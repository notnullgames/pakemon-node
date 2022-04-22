import r from 'raylib'

const buttons = {
  A: false,
  B: false,
  X: false,
  Y: false,
  L: false,
  R: false,
  SELECT: false,
  START: false,
  UP: false,
  DOWN: false,
  LEFT: false,
  RIGHT: false
}

export function draw () {
  r.ClearBackground(r.BLACK)
  r.DrawRectangle(90, 70, 20, 20, buttons.UP ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawRectangle(90, 120, 20, 20, buttons.DOWN ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawRectangle(65, 95, 20, 20, buttons.LEFT ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawRectangle(115, 95, 20, 20, buttons.RIGHT ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawRectangle(70, 40, 60, 10, buttons.L ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawRectangle(190, 40, 60, 10, buttons.R ? r.LIGHTGRAY : r.DARKGRAY)

  r.DrawRectangle(120, 160, 25, 10, buttons.SELECT ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawText('SELECT', 115, 180, 5, r.WHITE)

  r.DrawRectangle(170, 160, 25, 10, buttons.START ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawText('START', 165, 180, 5, r.WHITE)

  r.DrawCircle(215, 85, 13, buttons.X ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawText('X', 211, 80, 14, r.WHITE)

  r.DrawCircle(215, 135, 13, buttons.B ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawText('B', 211, 130, 14, r.WHITE)

  r.DrawCircle(190, 110, 13, buttons.Y ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawText('Y', 186, 105, 14, r.WHITE)

  r.DrawCircle(240, 110, 13, buttons.A ? r.LIGHTGRAY : r.DARKGRAY)
  r.DrawText('A', 236, 106, 14, r.WHITE)

  r.DrawText('Z=B | X=A | A=Y | S=X | Q=L | W=R', 70, 208, 4, r.WHITE)
  r.DrawText('SHIFT=SELECT | ENTER=START', 70, 220, 4, r.WHITE)
}

export function buttonPress (button) {
  buttons[button] = true
}

export function buttonRelease (button) {
  buttons[button] = false
}
