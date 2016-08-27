// After running the UMD builder, StereoConvergence does get used
var StereoConvergence = function (options) { // eslint-disable-line no-unused-vars
  var _this = this

  this.player = options.player || document.querySelector('[data-stereo-player]')
  this.eye = {
    left: this.player.querySelector(options.left || '[data-stereo-eye="left"]'),
    right: this.player.querySelector(options.right || '[data-stereo-eye="right"]')
  }
  this.outputs = {
    min: parseFloat(this.player.getAttribute('data-stereo-min')) || -1,
    max: parseFloat(this.player.getAttribute('data-stereo-max')) || 1
  }
  this.clip = options.clip || this.player.getAttribute('data-stereo-clip') || true
  this.inputs = {
    max: 1,
    min: 0
  }

  // Initialization
  this.init = function () {
    _this.bindEvents()

    // Clip images if instructed
    if (this.clip === true) {
      this.clipImage()
    }

    _this.getDimensions()
    window.addEventListener('resize', _this.getDimensions)
  }

  // Event Handling
  this.handleClick = function (event) {
    // prevent scrolling for touch
    event.preventDefault()

    var moveEvent = (event.touches ? event.touches[0] : event)

    // use single touch as event
    _this.setPositions(moveEvent)
  }

  // Event Binding
  this.bindEvents = function () {
    this.player.addEventListener('mousemove', _this.handleClick, false)
    this.player.addEventListener('touchmove', _this.handleClick, false)
  }

  // Event Unbinding
  this.destroy = function () {
    this.player.removeEventListener('mousemove', _this.handleClick)
    this.player.removeEventListener('touchmove', _this.handleClick)
  }

  // Image Overflow Clipping
  this.clipImage = function () {
    var percentageMax = Math.max(Math.abs(this.outputs.min), Math.abs(this.outputs.max))
    var clipMargin = (-1 * percentageMax) + '%'
    var clipWidth = (percentageMax * 2 + 100) + '%'
    this.eye.left.style.width = clipWidth
    this.eye.left.style.marginLeft = clipMargin
    this.eye.right.style.width = clipWidth
    this.eye.right.style.marginLeft = clipMargin
  }

  // Calculate Viewer Size and Position
  this.getDimensions = function () {
    _this.playerHeight = _this.player.clientHeight
    _this.playerBox = _this.player.getBoundingClientRect()
    _this.playerOffset = {
      top: _this.playerBox.top + document.body.scrollTop,
      left: _this.playerBox.left + document.body.scrollLeft
    }
  }

  // Set Positions
  this.setPositions = function (event) {
    if (_this.playerHeight !== _this.player.clientHeight) {
      _this.getDimensions()
      return
    }
    // get position
    var mY = event.pageY - _this.playerOffset.top
    // convert to percentage of image height and clip to input min / max for touch dragging
    var yAdjusted = Math.max(Math.min((mY / _this.playerHeight), _this.inputs.max), _this.inputs.min)
    // convert to user-set range
    var yConverted = _this.convert(yAdjusted)
    // move eyes in opposite directions
    _this.eye.left.style.transform = 'translateX(' + (-1 * yConverted) + '%)'
    _this.eye.right.style.transform = 'translateX(' + (yConverted) + '%)'
  }

  // Convert Pointer Values to Desired CSS Offsets
  this.convert = function (input) {
    var inputRange = (_this.inputs.max - _this.inputs.min)
    var outputRange = (_this.outputs.max - _this.outputs.min)
    var value = ((input - _this.inputs.min) / inputRange) * (outputRange) + _this.outputs.min
    return value
  }
}
