var Convergence = function(player){
	var _this         = this;
	this.player       = player;
	this.eyeLeft      = this.player.querySelector('[data-eye="left"]');
	this.eyeRight     = this.player.querySelector('[data-eye="right"]');
	this.outputs      = {
		min : ( parseFloat(this.player.getAttribute("data-stereo-min") ) !== null ) ? parseFloat(this.player.getAttribute("data-stereo-min")) : -1 ,
		max : ( parseFloat(this.player.getAttribute("data-stereo-max") ) !== null ) ? parseFloat(this.player.getAttribute("data-stereo-max")) : 1
	};
	this.clip         = ( player.getAttribute("data-stereo-clip") ? player.getAttribute("data-stereo-clip") : true );
	this.inputs       = {
		max : 1,
		min : 0
	};

	// Initialization
	this.init = function () {
		_this.bindEvents();

		// Clip images if instructed
		if ( this.clip == true ) {
			this.clipImage();
		}

		_this.getDimensions();
		window.onresize = _this.getDimensions();
	};

	// Event Binding
	this.bindEvents = function () {
		this.player.addEventListener('mousemove', function (event) {
			_this.setPositions(this, event);
		}, false);
		this.player.addEventListener('touchmove', function (event) {
			// prevent scrolling
			event.preventDefault();
			// use single touch as event
			_this.setPositions(this, event.touches[0]);
		}, false);
	};

	// Image Overflow Clipping
	this.clipImage = function (){
		var percentageMax         = Math.max( Math.abs(this.outputs.min), Math.abs(this.outputs.max) );
		var clipMargin            = ( -1 * percentageMax ) + "%";
		var clipWidth             = ( percentageMax * 2 + 100) + "%";
		this.eyeLeft.style.maxWidth    = clipWidth;
		this.eyeLeft.style.marginLeft  = clipMargin;
		this.eyeRight.style.maxWidth   = clipWidth;
		this.eyeRight.style.marginLeft = clipMargin;
	};

	// Calculate Viewer Size and Position
	this.getDimensions = function (){
		_this.playerHeight  = _this.player.clientHeight;
		_this.playerBox     = _this.player.getBoundingClientRect();
		_this.playerOffset  = {
			top: _this.playerBox.top + document.body.scrollTop,
			left: _this.playerBox.left + document.body.scrollLeft
		};
	};

	// Set Positions
	this.setPositions = function (player, event){
		if (_this.playerHeight !== player.clientHeight) {
			_this.getDimensions();
			return;
		}
		// get position
		var mY         = event.pageY - _this.playerOffset.top;
		// convert to percentage of image height and clip to input min / max for touch dragging
		var yAdjusted  = Math.max( Math.min( (mY / _this.playerHeight), _this.inputs.max ), _this.inputs.min);
		// convert to user-set range
		var yConverted = _this.convert(yAdjusted);
		// move eyes in opposite directions
		_this.eyeLeft.style.transform  = "translateX(" + (-1 * yConverted) + "%)";
		_this.eyeRight.style.transform = "translateX(" + (yConverted) + "%)";
	};

	// Convert Pointer Values to Desired CSS Offsets
	this.convert = function (input){
		var	inputRange  = (_this.inputs.max - _this.inputs.min);
		var	outputRange = ( _this.outputs.max - _this.outputs.min );
		var value       = ((input - _this.inputs.min) / (_this.inputs.max - _this.inputs.min)) * (_this.outputs.max - _this.outputs.min) + _this.outputs.min;
		return value;
	};

};

var players   = document.querySelectorAll('[data-stereoplayer]');
var instances = [];

// Loop over [data-stereoplayer] instances and initialize each as a stereoscopic viewer
for (var i = 0; i < players.length; ++i) {
	var player = players[i];
	instances[i] = new Convergence(player).init();

}
