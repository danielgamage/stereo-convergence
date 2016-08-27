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
  this.shouldRefresh = false

  // Initialization
  this.init = function () {
    _this.bindEvents()

    // Clip images if instructed
    if (_this.clip === true) {
      _this.clipImage()
    }

    _this.getDimensions()
  }

  // Event Handling
  this.handleClick = function (event) {
    // prevent scrolling for touch
    event.preventDefault()

    var moveEvent = (event.touches ? event.touches[0] : event)

    // use single touch as event
    _this.setPositions(moveEvent)
  }

  // Add Refresh Flag
  this.suggestRefresh = function () {
    // invalidate cache
    _this.shouldRefresh = true
    console.log('ran')
  }

  // Event Binding
  this.bindEvents = function () {
    _this.player.addEventListener('mousemove', _this.handleClick, false)
    _this.player.addEventListener('touchmove', _this.handleClick, false)
    window.addEventListener('resize', _this.suggestRefresh, false)
    window.addEventListener('scroll', _this.suggestRefresh, false)
  }

  // Event Unbinding
  this.destroy = function () {
    _this.player.removeEventListener('mousemove', _this.handleClick)
    _this.player.removeEventListener('touchmove', _this.handleClick)
    window.removeEventListener('resize', _this.suggestRefresh, false)
    window.removeEventListener('scroll', _this.suggestRefresh, false)
  }

  // Image Overflow Clipping
  this.clipImage = function () {
    var percentageMax = Math.max(Math.abs(_this.outputs.min), Math.abs(_this.outputs.max))
    var clipMargin = (-1 * percentageMax) + '%'
    var clipWidth = (percentageMax * 2 + 100) + '%'
    _this.eye.left.style.width = clipWidth
    _this.eye.left.style.marginLeft = clipMargin
    _this.eye.right.style.width = clipWidth
    _this.eye.right.style.marginLeft = clipMargin
  }

  // Calculate Viewer Size and Position
  this.getDimensions = function () {
    _this.playerHeight = _this.player.clientHeight
    _this.playerBox = _this.player.getBoundingClientRect()
    // revalidate the cache
    _this.shouldRefresh = false
  }

  // Set Positions
  this.setPositions = function (event) {
    console.log(_this.shouldRefresh)
    if (_this.shouldRefresh) {
      _this.getDimensions()
    }
    // get position
    var mY = event.clientY - _this.playerBox.top
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
