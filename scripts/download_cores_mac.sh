#!/bin/bash

# this will download all supported cores into default location on mac

if [ "$(uname -s)" == "Darwin" ];then
  LOCATION="apple/osx/$(uname -m)"
  DESTINATION="${HOME}/Library/Application Support/RetroArch/cores/"
else
  echo "Non-OSX not supported."
  exit 1
fi

SYSTEMS="atari800
bluemsx
fbneo
fceumm
gambatte
genesis_plus_gx
handy
lutro
mednafen_ngp
mednafen_pce_fast
mednafen_pcfx
mednafen_psx
mednafen_saturn
mednafen_supergrafx
mednafen_vb
mednafen_wswan
melonds
mgba
mupen64plus_next
np2kai
o2em
pcsx_rearmed
picodrive
pokemini
prosystem
snes9x
stella2014
swanstation
vecx
virtualjaguar"

for system in $SYSTEMS;do
  curl "https://buildbot.libretro.com/nightly/${LOCATION}/latest/${system}_libretro.dylib.zip" -o "/tmp/${system}_libretro.dylib.zip"
  unzip -o "/tmp/${system}_libretro.dylib.zip" -d "${DESTINATION}" && rm "/tmp/${system}_libretro.dylib.zip"
done
