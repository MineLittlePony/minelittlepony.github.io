---
layout: "@/layouts/MarkdownLayout.astro"
title: "Installation guide"
description: "A step-by-step guide on how to install Mine Little Pony mod"
menuEntry: "Installation"
---

> Instructions for installing the mod with LiteLoader (Minecraft 1.12) can be found [here](/installation/legacy/)

## Table of contents

## Required files

- [Fabric installer](https://fabricmc.net/use/) - needed to play Minecraft with mods. Example filename: `fabric-installer-0.10.2.exe`. File extension can be either `.jar` or `.exe`.
- [Fabric API mod](https://www.curseforge.com/minecraft/mc-mods/fabric-api) - required for most Fabric mods as it contains necessery utils.
- [HD Skins mod (optional)](https://github.com/MineLittlePony/HDSkins/releases) - adds an in-game interface to control your skins. Also allows to use HD skins and to upload skins to our server
- [Mine Little Pony mod](https://github.com/MineLittlePony/MineLittlePony/releases) - the mod itself

## Installing Fabric

Once you've downloaded all the files you need to install Fabric. Run the downloaded installer file, select the settings you want and click the "Install" button.

![Fabric installer](/installation/fabric-installer.png 'Fabric installer')

## Installing the mod

After installing Fabric you need to add your mods to the game. Place downloaded `.jar` files into `mods` folder in your Minecraft folder:

- `%APPDATA%\.minecraft` on Windows
- `~/Library/Application Support/minecraft` on macOS
- `~/.minecraft` on Linux

![Mods folder](/installation/mods-folder.png 'Mods folder')

## Play the game!

If everything was done correctly, a new Minecraft profile called something like `fabric-loader-1.18.1` should appear. Select it and launch the game. Now you should turn into a pony!

![Minecraft client with installed Fabric profile](/installation/minecraft-client.png 'Minecraft client with installed Fabric profile')
![Player pony](/installation/ingame.png 'Player pony')
