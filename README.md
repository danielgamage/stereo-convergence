# Stereo Convergence

2D javascript stereoscopic viewer.

## Installation

#### Bower
```
bower install --save stereo-convergence
```

## Usage

Convergence requires a container element with `data-stereoplayer` and two child elements for each eye, each with a corresponding `data-eye` attribute.

```
<div data-stereoplayer data-stereo-min="-0.8" data-stereo-max="1.6">
	<img data-eye="left" src="../../image-left" />
	<img data-eye="right" src="../../image-right" />
</div>

...

<link href="../bower_components/convergence/convergence.css" rel="stylesheet">
<script src="../bower_components/convergence/convergence.js"></script>
```

## Properties

#### `data-stereoplayer`

**Required**. Valueless attribute denotes container element to base image positioning from.

#### `data-eye`

**Required**. Attribute denotes elements (embedded media) to use for left / right eyes. Possible values are `left` and `right`.

#### `data-stereo-min`

_float_

Default: `-1`

Property adjusts the minimum divergence as a percentage.

#### `data-stereo-max`

_float_

Default: `1`

Property adjusts the maximum divergence as a percentage.

## TODO

* handling of outside edges (image clipping)
* additional theming?
* js image loading to ensure proper timing of code that gets image dimensions
* handle multiple stereo-convergence instances
