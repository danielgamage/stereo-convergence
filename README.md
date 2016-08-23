![Stereo Convergence example](http://i.giphy.com/3o6ozDEG1tnY7hmbsc.gif)

# Stereo Convergence

2D javascript stereoscopic viewer.

## Installation

#### npm
```bash
npm install --save stereo-convergence
```

## Usage

Convergence requires a container element with two child elements for each eye, each with some sort of unique identifier.

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
	var stereoPlayers   = document.querySelectorAll('[data-stereo-player]')

	var instances = []

	// NodeList → Array & loop through items
	[...stereoPlayers].map((el, i) => {

		// store instance in array for further manipulation
		instances[i] = new StereoConvergence({player: el})

		// initialize instance
		instances[i].init()
	})
</script>
```

Or if you want to manage configuration in javascript, pass an `options` object:

```html
<script>
let globalOptions = {
	left: '.stereo-convergence__eye--left',
	right: '.stereo-convergence__eye--right',
	clip: false
}

let players   = document.querySelectorAll('.stereo-convergence')
let instances = []

[...stereoPlayers].map((el, i) => {

	let localOptions = {
		// you can hypothetically fetch options dynamically
		player: el,
		min: data.players[i].min,
		max: data.players[i].max
	}

	// use the spread operator (...) to dump the two options objects into one object argument for StereoConvergence
	instances[i] = new StereoConvergence({...localOptions, ...globalOptions})
	instances[i].init()
})
</script>
```

## Properties

#### `player`

_Object_: DOM element

**Required**. Valueless attribute denotes container element to base image positioning from.

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
