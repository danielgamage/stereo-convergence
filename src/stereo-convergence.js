var playerHeight,
	playerBox,
	player    = document.querySelector('[data-stereoplayer]'),
	outMin    = parseFloat(player.getAttribute("data-stereo-min")),
	outMax    = parseFloat(player.getAttribute("data-stereo-max")),
	eyeLeft   = player.querySelector('[data-eye="left"]'),
	eyeRight  = player.querySelector('[data-eye="right"]'),
	outputs   = {
		min : ( outMin ? outMin  : -1 ),
		max : ( outMax ? outMax : 1 )
	},
	inputs = {
		max : 1,
		min : 0
	};

function getDimensions(){
	playerHeight  = player.clientHeight;
	playerBox     = player.getBoundingClientRect();
	player.offset = {
		top: playerBox.top + document.body.scrollTop,
		left: playerBox.left + document.body.scrollLeft
	};
};

function setPositions(event){
	// get position
	var mY         = event.pageY - player.offset.top;
	// convert to percentage of image height and clip to input min / max for touch dragging
	var yAdjusted  = Math.max( Math.min( (mY / playerHeight), inputs.max ), inputs.min);
	// convert to user-set range
	var yConverted = convert(yAdjusted);
	// move eyes in opposite directions
	eyeLeft.style.transform  = "translateX(" + (-1 * yConverted) + "%)";
	eyeRight.style.transform = "translateX(" + (yConverted) + "%)";
};

function convert(input){
	var	inputRange  = (inputs.max - inputs.min);
	var	outputRange = ( outputs.max - outputs.min );
	var value       = ((input - inputs.min) / (inputs.max - inputs.min)) * (outputs.max - outputs.min) + outputs.min;
	return value;
};

getDimensions();
window.onresize = getDimensions;

player.addEventListener('mousemove', setPositions, false);
player.addEventListener('touchmove', function (event) {
	// prevent scrolling
	event.preventDefault();
	// use single touch as event
	setPositions(event.touches[0]);
}, false);
