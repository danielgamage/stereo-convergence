# Convergence

View stereoscopic images and videos

## Installation

#### Bower
```
bower install --save convergence
```

## Usage

Convergence requires a container element with `data-stereoplayer` and two child elements for each eye, each with a corresponding `data-eye` attribute.

The container element may use the `data-stereo-min` and `data-stereo-max` attributes to set the max crossover (min) and max divergence (max) as percentages of the image widths.

```
<div data-stereoplayer data-stereo-min="-0.8" data-stereo-max="1.6">
	<img data-eye="left" src="../../image-left" />
	<img data-eye="right" src="../../image-right" />
</div>

...

<link href="../bower_components/convergence/convergence.css" rel="stylesheet">
<script src="../bower_components/convergence/convergence.js"></script>
```
