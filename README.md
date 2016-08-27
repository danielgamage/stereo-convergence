![Stereo Convergence example](http://i.giphy.com/3o6ozDEG1tnY7hmbsc.gif)

# Stereo Convergence

[![npm](https://img.shields.io/npm/v/stereo-convergence.svg?maxAge=864000)](https://www.npmjs.com/package/stereo-convergence)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/danielgamage/stereo-convergence/master/LICENSE.md)
[![David](https://img.shields.io/david/dev/danielgamage/stereo-convergence.svg?maxAge=2592000)]()

2D javascript stereoscopic viewer.

## Installation

#### npm
```bash
npm install --save stereo-convergence
```

## Usage

Convergence requires a container element with two child elements for each eye, each with some sort of unique identifier.

#### Basic

```html
<div data-stereo-player data-stereo-min="-0.8" data-stereo-max="1.6" data-stereo-clip="true">
	<img data-stereo-eye="left" src="../../image-left" />
	<img data-stereo-eye="right" src="../../image-right" />
</div>

...

<link href="../path/to/stereo-convergence/stereo-convergence.min.css" rel="stylesheet">
<script src="../path/to/stereo-convergence/stereo-convergence.min.js"></script>

<script>
	// select StereoConvergence containers
	var stereoPlayers   = document.querySelector('[data-stereo-player]')

	// store instance in variable for further manipulation
	var stereoPlayer = new StereoConvergence({player: stereoPlayers})

	// initialize instance
	stereoPlayer.init()

</script>
```

But this may be an oversimplified example. If you have more than one player, you need to initialize for each element. You may also want to manage configuration in javascript. To do this, pass an `options` object:

#### Advanced

```html
<script>
let globalOptions = {
	left: '.stereo-convergence__eye--left',
	right: '.stereo-convergence__eye--right',
	clip: false
}

let players   = document.querySelectorAll('.stereo-convergence')
let instances = []

// NodeList → Array & loop through items
[...stereoPlayers].map((el, i) => {

	let localOptions = {
		// you can hypothetically fetch options dynamically
		player: el,
		min: data.players[i].min,
		max: data.players[i].max
	}

	// A. use the spread operator (...) to dump the two options objects into one object argument for StereoConvergence
	// B. store each instance in an array for further manipulation
	instances[i] = new StereoConvergence({...localOptions, ...globalOptions})
	instances[i].init()
})
</script>
```

## Properties

#### `player`

_Object_: DOM element | **Required**

Valueless attribute denotes container element to base image positioning from.

#### `left`
#### `right`

_String_: CSS selector

`left` Default: `'[data-stereo-eye="left"]'`

`right` Default: `'[data-stereo-eye="right"]'`

Two properties, `left` and `right`, denote a selector to query via `querySelector` within the player. **There should only be two eyes**.

```js
left: '[data-stereo-eye="left"]'
right: '[data-stereo-eye="right"]'
```

#### `min`

_Number_: Float

Default: `-1`

Property adjusts the minimum divergence as a percentage of the image width.

#### `max`

_Number_: Float

Default: `1`

Property adjusts the maximum divergence as a percentage of the image width.

#### `clip`

_Boolean_

Default: `true`

Extends the images by the maximum distance the images can shift from center during interaction (ie, the largest absolute value between `min` and `max`), removing gaps from the edges of the stereo-player during interaction.
