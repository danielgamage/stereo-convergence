var playerHeight,
	playerBox,
	player    = document.querySelector('[data-stereoplayer]'),
	outMin    = parseFloat(player.getAttribute("data-stereo-min")),
	outMax    = parseFloat(player.getAttribute("data-stereo-max")),
	eyeLeft   = player.querySelector('[data-eye="left"]'),
	eyeRight  = player.querySelector('[data-eye="right"]'),
	outputs   = {
		min : ( outMin ? outMin  : 0 ),
		max : ( outMax ? outMax : 1 )
	},
	inputs = {
		max : 1,
		min : 0
	};

var getDimensions = function(){
	playerHeight  = player.clientHeight;
	playerBox     = player.getBoundingClientRect();
	player.offset = {
		top: playerBox.top + document.body.scrollTop,
		left: playerBox.left + document.body.scrollLeft
	};
};
getDimensions();
window.onresize = getDimensions;
player.onmousemove = function(event){
	var mY = event.pageY - player.offset.top;
	var yAdjusted = (mY / playerHeight);
	var yConverted = convert(yAdjusted)
	console.log("real: " + yAdjusted);
	console.log("converted: " + yConverted);
	eyeLeft.style.transform  = "translateX(" + (-1 * yConverted) + "%)";
	eyeRight.style.transform = "translateX(" + (yConverted) + "%)";
};

var convert = function(input){
	var	inputRange  = (inputs.max - inputs.min);
	var	outputRange = ( outputs.max - outputs.min );
	var value       = ((input - inputs.min) / (inputs.max - inputs.min)) * (outputs.max - outputs.min) + outputs.min;
	return value;
};
