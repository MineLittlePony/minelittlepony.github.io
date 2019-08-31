---
class: "skinning"
permalink: "/help/"
title: "Skinning guide"
description: "Learn how to draw your own skin for the Mine Little Pony mod, how to set the race of your character, how to add a hat to your character and other interesting things!"
---

## Contents
{:.no_toc}

- Table of contents
{:toc}

## Skin layout
As of Minecraft 1.8, skins now have an extra layer all over the body as opposed to just the head. This means that player models can now have sleeves and pants. The complex skin layout is twice the size of the older layout with a dimension of 64x64 pixels whereas the old layout is sized at 64x32 pixels. Blue color marks the extra layer of texture

![Complex skin layout]({{ '/assets/skinning/complextemplate.png' | relative_url }})

> As far as making skins for Mine Little Pony is concerned, the process remains the same for most part. It is important to note that leg textures are no longer mirrored, all legs now have their own texture space. Also left and right legs have different sides that face outward as well as sides that face inward; simply copying right leg textures to use on the left side won't work

![Twilight Sparkle complex skin layout]({{ '/assets/skinning/twilight_complex_template.png' | relative_url }})

{:.button}
[Download Twilight Sparkle complex skin]({{ '/assets/skinning/twilight_complex.png' | relative_url }}){:.download-button download="TwilightSparkle_complex.png"}

> Notice the bottom leg textures and how their faces are differently positioned. For right legs, the faces are, from left to right, inward > front > outward > back whereas left leg faces are inward > front > outward > back\\
> Body alignment is the same as the older skin layout

> Download the converter to quickly convert skins and resource packs to the new format\\
> Later versions of the mod will convert textures for you. The converter is not needed to simply use the old skins\\
> \\
> [Download converter](https://mega.nz/#!VJAVgSaT!MHYOKCIGL82drIAILA_w2gj5CD8CxXMxAyavG928Sw8){:.download-button}

## Legacy skin layout
The legacy skin layout uses the pre-1.8 skin template and is a good place to start if you have little or no experience making Mine Little Pony skins. Basic components like the head, hair, arms, legs and torso are kept in the same place and non-human parts such as the horn, wings, ears and extra textures are squeezed into unused areas. Below is a scaled-up and labeled template of Mine Little Pony skin

The blue pixels in the upper left corner are trigger pixels, read more about them below

> **T** - top, **BT** - bottom, **F** - front, **B** - back, **R** - right, **L** - left

![Simple skin template]({{ '/assets/skinning/simpletemplate.png' | relative_url }})

A comparison between a standard definition (SD) Twilight Sparkle skin and the default Steve skin shows where the extra parts go:

{:.images}
![Twilight Sparkle simple skin layout]({{ '/assets/skinning/twilight_simple_template.png' | relative_url }})
![Steve simple skin layout]({{ '/assets/skinning/steve_simple_template.png' | relative_url }})

{:.button}
[Download Twilight Sparkle simple skin]({{ '/assets/skinning/twilight_simple.png' | relative_url }}){:.download-button download="TwilightSparkle_simple.png"}

> The foreleg and hind leg textures are mirrored for the other side of the body as well as the body side textures. For more detailed skins, pay close attention to how some textures are flipped and mirrored around the player model. Use the guide below to see how body textures are matched up. Red color marks flipped textures
![Flipped textures of the body]({{ '/assets/skinning/flippedtextures.png' | relative_url }})

## Wings
The texture for the wings may seem a bit confusing. It may look like it is the texture for the entire wingspan, but this is only true when they are folded. When extended, the whole area is used for every single feather, meaning the exact same texture is used for all of the feathers. In actuality, they are skinned similarly to a 2x2 leg or arm

## Trigger pixels
You can use trigger pixels to determine the species of pony you are, the length of your tail, the gender, and the size of your pony. This is done by coloring the top left pixels of your Mine Little Pony skin a specific color

![Trigger pixels]({{ '/assets/skinning/pixels.png' | relative_url }}){:#pixels}

{% for item in site.data.pixels -%}
**{{ item.name }}** {{ item.description }}
{:.pixels}
{% for pixel in item.pixels %}
- <div class="pixel{% if pixel.color == nil %} empty{% endif %}"{% if pixel.color != nil %} style="background:{{ pixel.color }};"{% endif %}></div> **{{ pixel.color | default: "#\-\-\-\-\-\-" }}** {{ pixel.description }}
{% endfor %}
{% endfor %}

> Trigger pixels must use the specified colors and must stay in the above configuration. A skin without triger pixels will not be registered as a Mine Little Pony skin. It is not recommened to use a screen grab to sample the colors. Copy and paste the hex color codes instead or [download this image guide]({{ '/assets/skinning/pixels_raster.png' | relative_url }}){:download="pixels_raster.png"} and use an eyedropper tool

## HD skins
Mine Little Pony supports high definition (HD) skins in both the old and new skin layouts. HD skins can vary in resolution but their dimensions must be multiples of the original SD skin. For the older layout which is sized at 64x32, HD skins can be 128x64, 256x128, or 512x256. HD skins using the new layout can be sized at 64x64, 128x128, 256x256, or 512x512

{:.images}
![Twilight Sparkle SD complex skin layout]({{ '/assets/skinning/twilight_complex_template.png' | relative_url }})
![HD complex skin layout]({{ '/assets/skinning/hdskin.png' | relative_url }})

> HD skins must still follow the template for SD skins. Notice how the trigger pixels in the HD skin on the right aren't scaled up along with the rest of the skin. It is important that the trigger pixels are kept the same size and in the same configuration for Mine Little Pony to register the skin as a pony skin

## Alternate Skin Features
With the addition of Batponies and Seaponies, it is now possible to distinguish the features of each respective race. Batponies include different wings and ear tufts, and Seaponies include fish tails when submerged in water. Changelings get special bug wings, which can be seen in the example skins below. Zebras have longer necks and mohawks.

It is also now also possible to wear hats and saddlebags. While hats can not be textured, saddlebags can, taking up the wing spot in the skin texture. For texture reference please see the templates

Here's a couple example skins showing off the skins and how the new features are textured!

{:.images}
![Bat Pony (EEEE)]({{ '/assets/skinning/Stardust - Accessories - Upscaled' | relative_url }})
![Sea Pony (20,000 EEEEs Under the Sea!)]({{ '/assets/skinning/Seapony - Upscaled.png' | relative_url }})
![Changeling (they're not a bug ok?)]({{ '/assets/skinning/Changeling - Upscaled.png' | relative_url }})
![Zebra (fun fact, zebras are actually black with white stripes! How neat is that?!)]({{ '/assets/skinning/Zebra - Upscaled.png' | relative_url }})

{:.button}
[Download the four example skins:]({{ '/assets/skinning/example_skins.zip' | relative_url }}){:.download-button download="example_skins.zip"}


### Condensed Trigger Pixels and you!

Pony gear is the first of the skinning options that uses the new "Condensed Trigger Pixel Format" (CTPF for short) which allows you to select any combination of up to three values in the same pixel space.

To use this, you have to use an editor that allows for selecting colors based on their RGB values. (eg. GIMP, Paint.NET, Photoshop, and most others should all have this capability) Every value in this system is selected by setting any one of the respective pixel's channels to the same number corresponding to that value.

Words are *horrible* for explaining this, so here's a chart:

If you want to set option (1) on a pixel, you would set any of the pixel's three channels to the value (1). So following pixels would work:

R | G | B
1 | 0 | 0

As would any of these others:

0 | 1 | 0
0 | 0 | 1
1 | 1 | 1
0 | 1 | 0
23| 40| 1

Really, as long as (1) is present in either of the channels, that pixel will reflect as having the value (1).
You can also _add_ values together, meaning the last example (23 | 40 | 1) would also reflect as having the value (23) and the value (40).

These are just examples, though, so here's some *actual* values and what they mean!

#### Pony Gear

- **50**  - Muffin Hat
- **100** - Witch's Hat
- **200** - Saddle Bags (skinnable * )
- **250** - AJ's Stetson

| R   | G   | B   | Description |
|-----|-----|-----|:------------|
| 50  | 250 | 100 | Muffin Hat _and_ AJ's stetson _and_ the Witch's hat
| 200 | 0   | 0   | Just saddle bags (what most people might want)
| 50  | 0   | 0   | Muffin Hat (glory to the muffin queen!)

> As mentioned above, Saddle Bags are the only set of gear that is currently skinnable. They occupy the same area as the wings on Pegasi, and affect how wings are skinned on flying races.

Look, I know this might be confusing, and you might be wondering "But Zombie how on Earth do I do the pixels for this?!" Well wonder no more! Here for your convenience is an example skin of my OC but with all three hats enabled!

{:.images}
![Stardust wearing his snazzy hat stack, just like something straight out of TF2!]({{ '/assets/skinning/hatstack.png' | relative_url }})

Now let's see how this is actually accomplished!

{:.images}
![The Skin (with it's pixels of course!)]({{ '/assets/skinning/Stardust - Accessories - Upscaled.png' | relative_url }})
![HD complex skin layout]({{ '/assets/skinning/Accessory Values.png' | relative_url }})

{:.button}
[Download the Stardust Accessory Example Skin!]({{ '/assets/skinning/Stardust - Complex - Accessories.png' | relative_url }}){:.download-button download="Stardust - Complex - Accessories.png"}

Notice how the RGB Values for the outlined pixel correspond to the values for each hat? It's really a lot simpler than it sounds, but if this guide doesn't help you enough feel free to download the example skin so you can see how it works for yourself!

> There's also some fun secrets hidden away! What are they? Well they're secrets! (We can't just give away everything, where's the fun in that?!

## Uploading your skins
Regular SD skins can be uploaded to [Minecraft.net](https://minecraft.net/) like a normal skin. Make sure to select the "My skin fits on the classic 'Steve' player model" option. Both skin layouts can be uploaded to Minecraft.net

![Uploading skin to Minecraft.net]({{ '/assets/skinning/minecraftupload.png' | relative_url }})

Both SD and HD skins can be uploaded to Mine Little Pony's skin server which is independent from Minecraft's skin server. Skins uploaded to Mine Little Pony's server can only be seen by other clients with Mine Little Pony installed

To upload a skin to Mine Little Pony's skin server, launch the game with Mine Little Pony installed. When at the home screen (the screen with the panning panorama) press the icon with the leather pants on it. The HD skin manager should open along with a small window where you can drag and drop your skin on. The browse button can also be use to browse through your files if you prefer. Click the \"\>\>\" button and your skin will upload to the server. It may take some time for skin changes to be visible to other players

{:.images}
![Uploading skin to the mod's server]({{ '/assets/skinning/minelpupload.png' | relative_url }})
![Drop window]({{ '/assets/skinning/drop.png' | relative_url }}){:style="flex-grow:0;width:auto;align-self:flex-start;"}
