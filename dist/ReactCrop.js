'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function objectAssign(target, source) {
	var from = void 0;
	var to = target;
	var symbols = void 0;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (Object.prototype.hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (Object.prototype.propertyIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
}

var ReactCrop = function (_React$Component) {
	_inherits(ReactCrop, _React$Component);

	function ReactCrop(props) {
		_classCallCheck(this, ReactCrop);

		var _this = _possibleConstructorReturn(this, (ReactCrop.__proto__ || Object.getPrototypeOf(ReactCrop)).call(this, props));

		_this.xOrds = ['e', 'w'];
		_this.yOrds = ['n', 's'];
		_this.xyOrds = ['nw', 'ne', 'se', 'sw'];
		_this.arrowKey = {
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		_this.nudgeStep = 0.2;


		_this.state = _extends({}, props);
		return _this;
	}

	_createClass(ReactCrop, [{
		key: 'getDefaultProps',
		value: function getDefaultProps() {
			return {
				style: {},
				crop: {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				}
			};
		}
	}, {
		key: 'getInitialState',
		value: function getInitialState() {
			var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

			this.cropInvalid = props.crop.width === 0 || props.crop.height === 0;

			return {
				crop: props.crop
			};
		}
	}, {
		key: 'getStyles',
		value: function getStyles() {
			var style = this.props.style || {};
			var marchingAntsColour = style.marchingAntsColour || 'rgba(255,255,255,0.7)';
			var marchingAntsAltColour = style.marchingAntsAltColour || 'rgba(0,0,0,0.7)';

			var dragHandleWidth = style.dragHandleWidth || 9;
			var dragHandleHeight = style.dragHandleHeight || 9;
			var dragHandleBackgroundColour = style.dragHandleBackgroundColour || 'rgba(0,0,0,0.2)';
			var dragHandleBorder = style.dragHandleBorder || '1px solid rgba(255,255,255,0.7)';

			var dragBarSize = 6;

			var croppedAreaOverlayColor = 'rgba(0,0,0,0.6)';

			return {
				root: {
					position: 'relative',
					display: 'inline-block',
					cursor: 'crosshair',
					overflow: 'hidden',
					outline: 'none'
				},

				image: {
					display: 'block',
					maxWidth: '100%'
				},
				imageCopy: {
					maxWidth: '100%',
					position: 'absolute',
					top: 0,
					left: 0
				},

				cropWrapper: {
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					backgroundColor: croppedAreaOverlayColor
				},

				cropSelection: {
					position: 'absolute',
					top: 0,
					left: 0,
					transform: 'translate3d(0,0,0)',
					boxSizing: 'border-box',
					cursor: 'move',

					// Marching ants.
					backgroundImage: 'linear-gradient(to right, ' + marchingAntsColour + ' 50%, ' + marchingAntsAltColour + ' 50%),' + 'linear-gradient(to right, ' + marchingAntsColour + ' 50%, ' + marchingAntsAltColour + ' 50%),' + 'linear-gradient(to bottom, ' + marchingAntsColour + ' 50%, ' + marchingAntsAltColour + ' 50%),' + 'linear-gradient(to bottom, ' + marchingAntsColour + ' 50%, ' + marchingAntsAltColour + ' 50%)',
					padding: 1,
					backgroundSize: '10px 1px, 10px 1px, 1px 10px, 1px 10px',
					backgroundPosition: '0 0, 0 100%, 0 0, 100% 0',
					backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
					animation: 'marching-ants 2s',
					animationTimingFunction: 'linear',
					animationIterationCount: 'infinite',
					animationPlayState: 'running'
				},

				marchingAntsAnimation: '@keyframes marching-ants {\n\t\t\t\t\t0% {\n\t\t\t\t\t\tbackground-position: 0 0,  0 100%,  0 0,  100% 0;\n\t\t\t\t\t}\n\t\t\t\t\t100% {\n\t\t\t\t\t\tbackground-position: 40px 0, -40px 100%, 0 -40px, 100% 40px;\n\t\t\t\t\t}\n\t\t\t\t}',

				dragHandle: {
					position: 'absolute',
					width: dragHandleWidth,
					height: dragHandleHeight,
					backgroundColor: dragHandleBackgroundColour,
					border: dragHandleBorder,
					boxSizing: 'border-box',

					// This stops the borders disappearing when keyboard nudging.
					outline: '1px solid transparent'
				},

				ordNW: {
					top: 0,
					left: 0,
					marginTop: -Math.floor(dragHandleHeight / 2),
					marginLeft: -Math.floor(dragHandleWidth / 2),
					cursor: 'nw-resize'
				},
				ordN: {
					top: 0,
					left: '50%',
					marginTop: -Math.floor(dragHandleHeight / 2),
					marginLeft: -Math.floor(dragHandleWidth / 2),
					cursor: 'n-resize'
				},
				ordNE: {
					top: 0,
					right: 0,
					marginTop: -Math.floor(dragHandleHeight / 2),
					marginRight: -Math.floor(dragHandleWidth / 2),
					cursor: 'ne-resize'
				},
				ordE: {
					top: '50%',
					right: 0,
					marginTop: -Math.floor(dragHandleHeight / 2),
					marginRight: -Math.floor(dragHandleWidth / 2),
					cursor: 'e-resize'
				},
				ordSE: {
					bottom: 0,
					right: 0,
					marginBottom: -Math.floor(dragHandleHeight / 2),
					marginRight: -Math.floor(dragHandleWidth / 2),
					cursor: 'se-resize'
				},
				ordS: {
					bottom: 0,
					left: '50%',
					marginBottom: -Math.floor(dragHandleHeight / 2),
					marginLeft: -Math.floor(dragHandleWidth / 2),
					cursor: 's-resize'
				},
				ordSW: {
					bottom: 0,
					left: 0,
					marginBottom: -Math.floor(dragHandleHeight / 2),
					marginLeft: -Math.floor(dragHandleWidth / 2),
					cursor: 'sw-resize'
				},
				ordW: {
					top: '50%',
					left: 0,
					marginTop: -Math.floor(dragHandleHeight / 2),
					marginLeft: -Math.floor(dragHandleWidth / 2),
					cursor: 'w-resize'
				},

				dragBarN: {
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: dragBarSize,
					marginTop: -(dragBarSize - 2)
				},
				dragBarE: {
					position: 'absolute',
					right: 0,
					top: 0,
					width: dragBarSize,
					height: '100%',
					marginRight: -(dragBarSize - 2)
				},
				dragBarS: {
					position: 'absolute',
					bottom: 0,
					left: 0,
					width: '100%',
					height: dragBarSize,
					marginBottom: -(dragBarSize - 2)
				},
				dragBarW: {
					position: 'absolute',
					top: 0,
					left: 0,
					width: dragBarSize,
					height: '100%',
					marginLeft: -(dragBarSize - 2)
				}

			};
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.onDocMouseTouchMoveHandler = function (event) {
				return _this2.onDocMouseTouchMove(event);
			};
			this.onDocMouseTouchEndHandler = function (event) {
				return _this2.onDocMouseTouchEnd(event);
			};
			document.addEventListener('mousemove', this.onDocMouseTouchMoveHandler);
			document.addEventListener('touchmove', this.onDocMouseTouchMoveHandler);

			document.addEventListener('mouseup', this.onDocMouseTouchEndHandler);
			document.addEventListener('touchend', this.onDocMouseTouchEndHandler);
			document.addEventListener('touchcancel', this.onDocMouseTouchEndHandler);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('mousemove', this.onDocMouseTouchMoveHandler);
			document.removeEventListener('touchmove', this.onDocMouseTouchMoveHandler);

			document.removeEventListener('mouseup', this.onDocMouseTouchEndHandler);
			document.removeEventListener('touchend', this.onDocMouseTouchEndHandler);
			document.removeEventListener('touchcancel', this.onDocMouseTouchEndHandler);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState(this.getInitialState(nextProps));
		}
	}, {
		key: 'getCropStyle',
		value: function getCropStyle() {
			return {
				top: this.state.crop ? this.state.crop.y + '%' : '0',
				left: this.state.crop ? this.state.crop.x + '%' : '0',
				width: this.state.crop ? this.state.crop.width + '%' : '0',
				height: this.state.crop ? this.state.crop.height + '%' : '0'
			};
		}
	}, {
		key: 'straightenYPath',
		value: function straightenYPath(clientX) {
			var evData = this.evData;
			var ord = evData.ord;
			var cropOffset = evData.cropOffset;
			var cropStartWidth = evData.cropStartWidth / 100 * evData.imageWidth;
			var cropStartHeight = evData.cropStartHeight / 100 * evData.imageHeight;
			var k = void 0,
					d = void 0;

			if (ord === 'nw' || ord === 'se') {
				k = cropStartHeight / cropStartWidth;
				d = cropOffset.top - cropOffset.left * k;
			} else {
				k = -cropStartHeight / cropStartWidth;
				d = cropOffset.top + cropStartHeight - cropOffset.left * k;
			}

			return k * clientX + d;
		}
	}, {
		key: 'onDocMouseTouchMove',
		value: function onDocMouseTouchMove(e) {
			if (!this.mouseDownOnCrop) {
				return;
			}

			var crop = this.state.crop || {};
			var evData = this.evData;
			var clientPos = this.getClientPos(e);

			if (evData.isResize && crop.aspect && evData.cropOffset) {
				clientPos.y = this.straightenYPath(clientPos.x);
			}

			var xDiffPx = clientPos.x - evData.clientStartX;
			evData.xDiffPc = xDiffPx / evData.imageWidth * 100;

			var yDiffPx = clientPos.y - evData.clientStartY;
			evData.yDiffPc = yDiffPx / evData.imageHeight * 100;

			if (evData.isResize) {
				this.resizeCrop();
			} else {
				this.dragCrop();
			}

			this.cropInvalid = false;

			if (this.props.onChange) {
				this.props.onChange(crop);
			}

			this.setState({ crop: crop });
		}
	}, {
		key: 'getNewSize',
		value: function getNewSize() {
			var crop = this.state.crop;
			var evData = this.evData;
			var imageAspect = evData.imageWidth / evData.imageHeight;

			// New width.
			var newWidth = evData.cropStartWidth + evData.xDiffPc;

			if (evData.xCrossOver) {
				newWidth = Math.abs(newWidth);
			}

			var maxWidth = 100;

			// Stop the box expanding on the opposite side when some edges are hit.
			if (!this.state.newCropIsBeingDrawn) {
				maxWidth = ['nw', 'w', 'sw'].indexOf(evData.inversedXOrd || evData.ord) > -1 ? evData.cropStartX : 100 - evData.cropStartX;
			}

			newWidth = this.clamp(newWidth, this.props.minWidth || 0, maxWidth);

			// New height.
			var newHeight = void 0;

			if (crop.aspect) {
				newHeight = newWidth / crop.aspect * imageAspect;
			} else {
				newHeight = evData.cropStartHeight + evData.yDiffPc;
			}

			if (evData.yCrossOver) {
				// Cap if polarity is inversed and the shape fills the y space.
				newHeight = Math.min(Math.abs(newHeight), evData.cropStartY);
			}

			var maxHeight = 100;

			// Stop the box expanding on the opposite side when some edges are hit.
			if (!this.state.newCropIsBeingDrawn) {
				maxHeight = ['nw', 'n', 'ne'].indexOf(evData.inversedYOrd || evData.ord) > -1 ? evData.cropStartY : 100 - evData.cropStartY;
			}

			newHeight = this.clamp(newHeight, this.props.minHeight || 0, maxHeight);

			if (crop.aspect) {
				newWidth = newHeight * crop.aspect / imageAspect;
			}

			return {
				width: newWidth,
				height: newHeight
			};
		}
	}, {
		key: 'resizeCrop',
		value: function resizeCrop() {
			var crop = this.state.crop || {};
			var evData = this.evData;
			var ord = evData.ord;

			// On the inverse change the diff so it's the same and
			// the same algo applies.
			if (evData.xInversed) {
				evData.xDiffPc -= evData.cropStartWidth * 2;
			}
			if (evData.yInversed) {
				evData.yDiffPc -= evData.cropStartHeight * 2;
			}

			// New size.
			var newSize = this.getNewSize();

			// Adjust x/y to give illusion of 'staticness' as width/height is increased
			// when polarity is inversed.
			var newX = evData.cropStartX;
			var newY = evData.cropStartY;

			if (evData.xCrossOver) {
				newX = crop.x + (crop.width - newSize.width);
			}

			if (evData.yCrossOver) {
				// This not only removes the little "shake" when inverting at a diagonal, but for some
				// reason y was way off at fast speeds moving sw->ne with fixed aspect only, I couldn't
				// figure out why.
				if (evData.lastYCrossover === false) {
					newY = crop.y - newSize.height;
				} else {
					newY = crop.y + (crop.height - newSize.height);
				}
			}

			crop.x = this.clamp(newX, 0, 100 - newSize.width);
			crop.y = this.clamp(newY, 0, 100 - newSize.height);

			// Apply width/height changes depending on ordinate.
			if (this.xyOrds.indexOf(ord) > -1) {
				crop.width = newSize.width;
				crop.height = newSize.height;
			} else if (this.xOrds.indexOf(ord) > -1) {
				crop.width = newSize.width;
			} else if (this.yOrds.indexOf(ord) > -1) {
				crop.height = newSize.height;
			}

			evData.lastYCrossover = evData.yCrossOver;
			this.crossOverCheck();
		}
	}, {
		key: 'dragCrop',
		value: function dragCrop() {
			var crop = this.state.crop || {};
			var evData = this.evData;
			crop.x = this.clamp(evData.cropStartX + evData.xDiffPc, 0, 100 - crop.width);
			crop.y = this.clamp(evData.cropStartY + evData.yDiffPc, 0, 100 - crop.height);
		}
	}, {
		key: 'inverseOrd',
		value: function inverseOrd(ord) {
			var inverseOrd = void 0;

			if (ord === 'n') inverseOrd = 's';else if (ord === 'ne') inverseOrd = 'sw';else if (ord === 'e') inverseOrd = 'w';else if (ord === 'se') inverseOrd = 'nw';else if (ord === 's') inverseOrd = 'n';else if (ord === 'sw') inverseOrd = 'ne';else if (ord === 'w') inverseOrd = 'e';else if (ord === 'nw') inverseOrd = 'se';

			return inverseOrd;
		}
	}, {
		key: 'crossOverCheck',
		value: function crossOverCheck() {
			var evData = this.evData;

			if (!evData.xCrossOver && -Math.abs(evData.cropStartWidth) - evData.xDiffPc >= 0 || evData.xCrossOver && -Math.abs(evData.cropStartWidth) - evData.xDiffPc <= 0) {
				evData.xCrossOver = !evData.xCrossOver;
			}

			if (!evData.yCrossOver && -Math.abs(evData.cropStartHeight) - evData.yDiffPc >= 0 || evData.yCrossOver && -Math.abs(evData.cropStartHeight) - evData.yDiffPc <= 0) {
				evData.yCrossOver = !evData.yCrossOver;
			}

			var swapXOrd = evData.xCrossOver !== evData.startXCrossOver;
			var swapYOrd = evData.yCrossOver !== evData.startYCrossOver;

			evData.inversedXOrd = swapXOrd ? this.inverseOrd(evData.ord) : false;
			evData.inversedYOrd = swapYOrd ? this.inverseOrd(evData.ord) : false;
		}
	}, {
		key: 'onCropMouseTouchDown',
		value: function onCropMouseTouchDown(e) {
			e.preventDefault(); // Stop drag selection.

			var crop = this.state.crop || {};
			var clientPos = this.getClientPos(e);

			// Focus for detecting keypress.
			this.component.focus();

			var ord = e.target.dataset.ord;
			var xInversed = ord === 'nw' || ord === 'w' || ord === 'sw';
			var yInversed = ord === 'nw' || ord === 'n' || ord === 'ne';

			var cropOffset = void 0;

			if (crop.aspect) {
				cropOffset = this.getElementOffset(this.cropSelect);
			}

			this.evData = {
				imageWidth: this.image.width,
				imageHeight: this.image.height,
				clientStartX: clientPos.x,
				clientStartY: clientPos.y,
				cropStartWidth: crop.width,
				cropStartHeight: crop.height,
				cropStartX: xInversed ? crop.x + crop.width : crop.x,
				cropStartY: yInversed ? crop.y + crop.height : crop.y,
				xInversed: xInversed,
				yInversed: yInversed,
				xCrossOver: xInversed,
				yCrossOver: yInversed,
				startXCrossOver: xInversed,
				startYCrossOver: yInversed,
				isResize: e.target !== this.cropSelect,
				ord: ord,
				cropOffset: cropOffset
			};

			this.mouseDownOnCrop = true;
		}
	}, {
		key: 'getClientPos',
		value: function getClientPos(e) {
			var clientX = void 0,
					clientY = void 0;

			if (e.touches) {
				clientX = e.touches[0].clientX;
				clientY = e.touches[0].clientY;
			} else {
				clientX = e.clientX;
				clientY = e.clientY;
			}

			return {
				x: clientX,
				y: clientY
			};
		}
	}, {
		key: 'onComponentMouseTouchDown',
		value: function onComponentMouseTouchDown(e) {
			if (e.target !== this.imageCopy) {
				return;
			}

			e.preventDefault(); // Stop drag selection.

			var crop = this.state.crop || {};
			var clientPos = this.getClientPos(e);

			// Focus for detecting keypress.
			this.component.focus();

			var imageOffset = this.getElementOffset(this.image);
			var xPc = (clientPos.x - imageOffset.left) / this.image.width * 100;
			var yPc = (clientPos.y - imageOffset.top) / this.image.height * 100;

			crop.x = xPc;
			crop.y = yPc;
			crop.width = 0;
			crop.height = 0;

			this.evData = {
				imageWidth: this.image.width,
				imageHeight: this.image.height,
				clientStartX: clientPos.x,
				clientStartY: clientPos.y,
				cropStartWidth: crop.width,
				cropStartHeight: crop.height,
				cropStartX: crop.x,
				cropStartY: crop.y,
				xInversed: false,
				yInversed: false,
				xCrossOver: false,
				yCrossOver: false,
				startXCrossOver: false,
				startYCrossOver: false,
				isResize: true,
				ord: 'nw'
			};

			this.mouseDownOnCrop = true;
			this.setState({ newCropIsBeingDrawn: true });
		}
	}, {
		key: 'onComponentKeyDown',
		value: function onComponentKeyDown(e) {
			var keyCode = e.which;
			var crop = this.state.crop || {};
			var nudged = false;

			if (!crop.width || !crop.height) {
				return;
			}

			if (keyCode === this.arrowKey.left) {
				crop.x -= this.nudgeStep;
				nudged = true;
			} else if (keyCode === this.arrowKey.right) {
				crop.x += this.nudgeStep;
				nudged = true;
			} else if (keyCode === this.arrowKey.up) {
				crop.y -= this.nudgeStep;
				nudged = true;
			} else if (keyCode === this.arrowKey.down) {
				crop.y += this.nudgeStep;
				nudged = true;
			}

			if (nudged) {
				crop.x = this.clamp(crop.x, 0, 100 - crop.width);
				crop.y = this.clamp(crop.y, 0, 100 - crop.height);

				this.setState({ crop: crop });

				if (this.props.onChange) {
					this.props.onChange(crop);
				}
				if (this.props.onComplete) {
					this.props.onComplete(crop);
				}
			}
		}
	}, {
		key: 'onDocMouseTouchEnd',
		value: function onDocMouseTouchEnd(e) {
			if (this.mouseDownOnCrop) {

				this.cropInvalid = !this.state.crop.width && !this.state.crop.height;
				this.mouseDownOnCrop = false;

				if (this.props.onComplete) {
					this.props.onComplete(this.state.crop);
				}

				this.setState({ newCropIsBeingDrawn: false });
			}
		}
	}, {
		key: 'getElementOffset',
		value: function getElementOffset(el) {
			var rect = el.getBoundingClientRect();
			var docEl = document.documentElement;

			var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
			var rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;

			return {
				top: rectTop,
				left: rectLeft
			};
		}
	}, {
		key: 'clamp',
		value: function clamp(num, min, max) {
			return Math.min(Math.max(num, min), max);
		}
	}, {
		key: 'createCropSelection',
		value: function createCropSelection(newCrop, fixedAspect) {
			var _this3 = this;

			var styles = this.getStyles();

			return _react2.default.createElement(
					'div',
					{ ref: function ref(_ref3) {
						return _this3.cropSelect = _ref3;
					},
						style: objectAssign(styles.cropSelection, this.getCropStyle()),
						onMouseDown: function onMouseDown(event) {
							return _this3.onCropMouseTouchDown(event);
						},
						onTouchStart: function onTouchStart(event) {
							return _this3.onCropMouseTouchDown(event);
						} },
					!newCrop && _react2.default.createElement(
							'div',
							{ ref: function ref(_ref2) {
								return _this3.cropHandles = _ref2;
							} },
							!fixedAspect && _react2.default.createElement(
									'div',
									{ ref: function ref(_ref) {
										return _this3.fixedAspectHandles = _ref;
									} },
									_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordN }), 'data-ord': 'n' }),
									_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordE }), 'data-ord': 'e' }),
									_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordS }), 'data-ord': 's' }),
									_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordW }), 'data-ord': 'w' }),
									_react2.default.createElement('div', { style: styles.dragBarN, 'data-ord': 'n' }),
									_react2.default.createElement('div', { style: styles.dragBarE, 'data-ord': 'e' }),
									_react2.default.createElement('div', { style: styles.dragBarS, 'data-ord': 's' }),
									_react2.default.createElement('div', { style: styles.dragBarW, 'data-ord': 'w' })
							),
							_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordNW }), 'data-ord': 'nw' }),
							_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordNE }), 'data-ord': 'ne' }),
							_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordSE }), 'data-ord': 'se' }),
							_react2.default.createElement('div', { style: (0, _reactAddonsUpdate2.default)(styles.dragHandle, { $merge: styles.ordSW }), 'data-ord': 'sw' })
					)
			);
		}
	}, {
		key: 'arrayToPercent',
		value: function arrayToPercent(arr, delimeter) {
			delimeter = delimeter || ' ';
			return arr.map(function (number) {
				return number + '%';
			}).join(delimeter);
		}
	}, {
		key: 'getImageClipStyle',
		value: function getImageClipStyle() {
			var crop = this.state.crop || {};

			var right = 100 - (crop.x + crop.width);
			var bottom = 100 - (crop.y + crop.height);

			// Safari doesn't like it if values add up to exactly
			// 100 (it doesn't draw the clip). I have submitted a bug.
			if (crop.x + right === 100) {
				right -= 0.00001;
			}

			if (crop.y + bottom === 100) {
				bottom -= 0.00001;
			}

			var insetVal = 'inset(' + this.arrayToPercent([crop.y, right, bottom, crop.x]) + ')';

			return {
				WebkitClipPath: insetVal,
				clipPath: insetVal
			};
		}
	}, {
		key: 'onImageLoad',
		value: function onImageLoad(e) {
			var crop = this.state.crop || {};
			var imageWidth = e.target.naturalWidth;
			var imageHeight = e.target.naturalHeight;
			var imageAspect = imageWidth / imageHeight;

			// If there is a width or height then infer the other to
			// ensure the value is correct.
			if (crop.aspect) {
				if (crop.width) {
					crop.height = crop.width / crop.aspect * imageAspect;
				} else if (crop.height) {
					crop.width = crop.height * crop.aspect / imageAspect;
				}
				this.cropInvalid = !crop.width || !crop.height;
				this.setState({ crop: crop });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var styles = this.getStyles();
			var cropSelection = void 0,
					imageClipStyle = void 0;
			var fixedAspect = !!(this.state.crop && this.state.crop.aspect);
			var newCrop = this.state.newCropIsBeingDrawn;

			if (!this.cropInvalid) {
				cropSelection = this.createCropSelection(newCrop, fixedAspect);
				imageClipStyle = this.getImageClipStyle();
			}

			var rootStyles = styles.root;

			return _react2.default.createElement(
					'div',
					{
						ref: function ref(_ref6) {
							return _this4.component = _ref6;
						},
						style: objectAssign(rootStyles, this.props.style),
						onTouchStart: function onTouchStart(event) {
							return _this4.onComponentMouseTouchDown(event);
						},
						onMouseDown: function onMouseDown(event) {
							return _this4.onComponentMouseTouchDown(event);
						},
						tabIndex: '1',
						onKeyDown: function onKeyDown(event) {
							return _this4.onComponentKeyDown(event);
						} },
					_react2.default.createElement(
							'style',
							{ scoped: true, type: 'text/css' },
							styles.marchingAntsAnimation
					),
					_react2.default.createElement('img', { ref: function ref(_ref4) {
						return _this4.image = _ref4;
					}, style: styles.image, src: this.props.src, onLoad: function onLoad(event) {
						return _this4.onImageLoad(event);
					} }),
					_react2.default.createElement(
							'div',
							{ style: styles.cropWrapper },
							_react2.default.createElement('img', { ref: function ref(_ref5) {
								return _this4.imageCopy = _ref5;
							}, style: objectAssign(styles.imageCopy, imageClipStyle), src: this.props.src }),
							cropSelection
					),
					this.props.children
			);
		}
	}]);

	return ReactCrop;
}(_react2.default.Component);

ReactCrop.propTypes = {
	src: _propTypes2.default.string.isRequired,
	style: _propTypes2.default.object,
	crop: _propTypes2.default.object,
	minWidth: _propTypes2.default.number,
	minHeight: _propTypes2.default.number
};
;

exports.default = ReactCrop;