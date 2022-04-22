# pakemon

This is a very simple ROM & minigame runner designed for small handhelds (GPi1 case is my test-device.) It's meant to require little-to-no configuration, and work on systems that use a gamepad-only.

The idea is that you categorize your ROMs by system-name or whatever you want and it will map the extension to a libretro core.

file layout looks like this:

```
games/
├── GBA/
│   ├── icon.png
│   └── roms/
├── Gameboy/
│   ├── icon.png
│   └── roms/
├── NES/
│   ├── icon.png
│   └── roms/
├── Pakémon/
│   ├── icon.png
│   └── roms/
├── SNES/
│   ├── icon.png
│   └── roms/
├── node-raylib/
│   ├── icon.png
│   └── roms/
└── systems.json
```

and put your roms in `roms/`. You can name the system-folder whatever you want, just add an `icon.png` file to represent it.


## respawn

Pakemon exits when it runs things, so you should set it to respawn, like via systemd. I made an example script in `scripts/pakemon.service`. You can install it like this:

```sh
sudo cp scripts/pakemon.service /lib/systemd/system/
sudo chmod 644 /lib/systemd/system/pakemon.service
sudo systemctl daemon-reload
sudo systemctl enable pakemon.service
```



## cores

In order to run every possible system-type, make sure you have all the cores [here](https://jean-andre-santoni.gitbook.io/ludo/emulated-consoles) (I use the same mappings) and have retroarch in your path. On mac, it's assumed you have retroarch installed, normally, otherwise it assumes you have it in your path. Additionally, by default, it also has support for shell-scripts, in-process js files (that have access to node-raylib) and wasm files for [null0](https://github.com/notnullgames/null0). Use `games/systems.json` to map things differnetly, if you want.

You can quickly install more libretro cores, from [here](https://buildbot.libretro.com/nightly/). I put some scripts in scripts/ to make it go faster installing them.


### node-raylib

You can run an in-process game, if you put a js-file in one of your games/ dirs. It has a specific structure:


```js
// called when the scene is loaded
export function init (params) {
}

// called when the scene is unloaded
export function destroy (params) {
}

// called before draw-loop on every frame
export function update () {
}

// called in draw-loop on every frame
export function draw () {
}

// called when a mapped button is pressed
export function buttonPress (button) {
}

// called when a mapped button is released
export function buttonRelease (button) {
}
```

### null0

I'm still working on the engine, but this will allow you to load [null0](https://github.com/notnullgames/null0) wasm roms.