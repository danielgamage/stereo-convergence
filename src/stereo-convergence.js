var Convergence = function(player){
	var _this         = this;
	this.player       = player;
	this.playerHeight = 0;
	this.playerBox    = this.player.getBoundingClientRect();
	this.outMin       = parseFloat(this.player.getAttribute("data-stereo-min"));
	this.outMax       = parseFloat(this.player.getAttribute("data-stereo-max"));
	this.eyeLeft      = this.player.querySelector('[data-eye="left"]');
	this.eyeRight     = this.player.querySelector('[data-eye="right"]');
	this.outputs      = {
		min : ( this.outMin ? this.outMin  : -1 ),
		max : ( this.outMax ? this.outMax : 1 )
	};
	this.clip         = ( player.getAttribute("data-stereo-clip") ? player.getAttribute("data-stereo-clip") : true );
	this.inputs       = {
		max : 1,
		min : 0
	};

	this.init = function () {
		_this.bindEvents();

		// Clip images if instructed
		if ( this.clip == true ) {
			this.clipImage();
		}

		_this.getDimensions();
		window.onresize = _this.getDimensions();
	};

	this.bindEvents = function () {
		// Bind events
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

	this.clipImage = function (){
		var percentageMax         = Math.max( Math.abs(this.outputs.min), Math.abs(this.outputs.max) );
		var clipMargin            = ( -1 * percentageMax ) + "%";
		var clipWidth             = ( percentageMax * 2 + 100) + "%";
		this.eyeLeft.style.maxWidth    = clipWidth;
		this.eyeLeft.style.marginLeft  = clipMargin;
		this.eyeRight.style.maxWidth   = clipWidth;
		this.eyeRight.style.marginLeft = clipMargin;
	};

	this.getDimensions = function (){
		_this.playerHeight  = _this.player.clientHeight;
		_this.playerBox     = _this.player.getBoundingClientRect();
		_this.playerOffset  = {
			top: _this.playerBox.top + document.body.scrollTop,
			left: _this.playerBox.left + document.body.scrollLeft
		};
	};

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
		console.log(yConverted);
		// move eyes in opposite directions
		_this.eyeLeft.style.transform  = "translateX(" + (-1 * yConverted) + "%)";
		_this.eyeRight.style.transform = "translateX(" + (yConverted) + "%)";
	};

	this.convert = function (input){
		var	inputRange  = (_this.inputs.max - _this.inputs.min);
		var	outputRange = ( _this.outputs.max - _this.outputs.min );
		var value       = ((input - _this.inputs.min) / (_this.inputs.max - _this.inputs.min)) * (_this.outputs.max - _this.outputs.min) + _this.outputs.min;
		return value;
	};

};

var players   = document.querySelectorAll('[data-stereoplayer]');
var instances = [];
for (var i = 0; i < players.length; ++i) {
	var player = players[i];  // Calling myNodeList.item(i) isn't necessary in JavaScript
	instances[i] = new Convergence(player).init();

}
