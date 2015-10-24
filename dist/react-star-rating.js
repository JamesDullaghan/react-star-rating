'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function isFloat(n) {
  return n === Number(n) && n % 1 !== 0;
}

var StarRating = (function (_React$Component) {
  _inherits(StarRating, _React$Component);

  _createClass(StarRating, null, [{
    key: 'propTypes',
    value: {
      name: _react2['default'].PropTypes.string.isRequired,
      caption: _react2['default'].PropTypes.string,
      totalStars: _react2['default'].PropTypes.number.isRequired,
      rating: _react2['default'].PropTypes.number,
      onRatingClick: _react2['default'].PropTypes.func,
      disabled: _react2['default'].PropTypes.bool,
      editing: _react2['default'].PropTypes.bool,
      size: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      step: 0.5,
      totalStars: 5,
      onRatingClick: function onRatingClick() {},
      disabled: false
    },
    enumerable: true
  }]);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    _get(Object.getPrototypeOf(StarRating.prototype), 'constructor', this).call(this, props);

    this.state = {
      currentRatingVal: props.rating,
      currentRatingPos: this.getStarRatingPosition(props.rating),
      editing: props.editing || true,
      rating: props.rating,
      pos: this.getStarRatingPosition(props.rating),
      glyph: this.getStars()
    };
  }

  _createClass(StarRating, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.min = 0;
      this.max = this.props.totalStars || 5;

      if (this.props.rating) {
        this.state.editing = this.props.editing || false;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.root = _reactDom2['default'].findDOMNode(this.refs.root);
      this.ratingContainer = _reactDom2['default'].findDOMNode(this.refs.ratingContainer);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete this.root;
      delete this.ratingContainer;
    }
  }, {
    key: 'getStars',
    value: function getStars() {
      var stars = '';
      var numRating = this.props.totalStars;
      for (var i = 0; i < numRating; i++) {
        stars += '★';
      }
      return stars;
    }
  }, {
    key: 'getPosition',
    value: function getPosition(e) {
      return e.clientX - this.root.getBoundingClientRect().left;
    }
  }, {
    key: 'getWidthFromValue',
    value: function getWidthFromValue(val) {
      var min = this.min,
          max = this.max;
      if (val <= min || min === max) {
        return 0;
      }
      if (val >= max) {
        return 100;
      }
      return (val - min) * 100 / (max - min);
    }
  }, {
    key: 'applyPrecision',
    value: function applyPrecision(val, precision) {
      return parseFloat(val.toFixed(precision));
    }
  }, {
    key: 'getDecimalPlaces',
    value: function getDecimalPlaces(num) {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
  }, {
    key: 'getValueFromPosition',
    value: function getValueFromPosition(pos) {
      var precision = this.getDecimalPlaces(this.props.step);
      var maxWidth = this.ratingContainer.offsetWidth;
      var diff = this.max - this.min;
      var factor = diff * pos / (maxWidth * this.props.step);
      factor = Math.ceil(factor);
      var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
      val = Math.max(Math.min(val, this.max), this.min);
      return val;
    }
  }, {
    key: 'calculate',
    value: function calculate(pos) {
      var val = this.getValueFromPosition(pos),
          width = this.getWidthFromValue(val);

      width += '%';
      return { width: width, val: val };
    }
  }, {
    key: 'getStarRatingPosition',
    value: function getStarRatingPosition(val) {
      return this.getWidthFromValue(val) + '%';
    }
  }, {
    key: 'getRatingEvent',
    value: function getRatingEvent(e) {
      var pos = this.getPosition(e);
      return this.calculate(pos);
    }
  }, {
    key: 'getSvg',
    value: function getSvg(rating) {
      var stars = [];
      for (var i = 0; i < this.props.totalStars; i++) {
        var attrs = {};
        attrs['transform'] = 'translate(' + i * 50 + ', 0)';
        attrs['fill'] = i + 0.5 <= rating ? '#FFA91B' : '#C6C6C6';
        stars.push(_react2['default'].createElement('path', _extends({ key: 'star-' + i }, attrs, { 'data-mask': 'url(#half-star-mask)', d: 'm0,18.1l19.1,0l5.9,-18.1l5.9,18.1l19.1,0l-15.4,11.2l5.9,18.1l-15.4,-11.2l-15.4,11.2l5.9,-18.1l-15.4,-11.2l0,0z' })));
      }

      var styles = {
        width: stars.length * 50 + 'px',
        height: '50px'
      };

      return _react2['default'].createElement(
        'svg',
        { className: 'rsr__star',
          style: styles,
          viewBox: '0 0 ' + stars.length + ' 50',
          preserveAspectRatio: 'xMinYMin meet',
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg' },
        _react2['default'].createElement(
          'defs',
          null,
          _react2['default'].createElement(
            'mask',
            { id: 'half-star-mask' },
            _react2['default'].createElement('rect', { x: '0', y: '0', width: '26', height: '50', fill: 'blue' })
          )
        ),
        _react2['default'].createElement(
          'g',
          null,
          stars.map(function (item) {
            return item;
          })
        )
      );
    }
  }, {
    key: 'updateRating',
    value: function updateRating(width, val) {
      this.setState({
        pos: width,
        rating: val
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        this.updateRating(this.getStarRatingPosition(nextProps.rating), nextProps.rating);
        return true;
      } else {
        return nextState.currentRatingVal !== this.state.currentRatingVal || nextState.rating !== this.state.rating;
      }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        pos: this.state.currentRatingPos,
        rating: this.state.currentRatingVal
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var ratingEvent = this.getRatingEvent(e);
      this.updateRating(ratingEvent.width, ratingEvent.val);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      var payload = {
        currentRatingPos: this.state.pos,
        currentRatingVal: this.state.rating,
        caption: this.props.caption,
        name: this.props.name
      };

      this.setState(payload);

      this.props.onRatingClick(e, {
        rating: this.state.rating,
        position: this.state.pos,
        caption: this.props.caption,
        name: this.props.name
      });
    }
  }, {
    key: 'treatName',
    value: function treatName(title) {
      if (typeof title === 'string') {
        return title.toLowerCase().split(' ').join('_');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _cx;

      var caption = null;
      var classes = (0, _classnames2['default'])((_cx = {
        'rsr-root': true,
        'rsr--disabled': this.props.disabled
      }, _defineProperty(_cx, 'rsr--' + this.props.size, this.props.size), _defineProperty(_cx, 'rsr--editing', this.state.editing), _cx));

      if (this.props.caption) {
        caption = _react2['default'].createElement(
          'span',
          { className: 'rsr__caption' },
          this.props.caption
        );
      }

      var attrs = {};
      if (this.state.editing) {
        attrs['onMouseMove'] = this.handleMouseMove.bind(this);
        attrs['onMouseLeave'] = this.handleMouseLeave.bind(this);
        attrs['onClick'] = this.handleClick.bind(this);
      }

      return _react2['default'].createElement(
        'span',
        { className: 'rsr-container' },
        caption,
        _react2['default'].createElement(
          'div',
          { ref: 'root', className: classes },
          _react2['default'].createElement(
            'div',
            _extends({ ref: 'ratingContainer',
              className: 'rsr rating-gly-star',
              'data-content': this.state.glyph }, attrs),
            this.getSvg(this.state.rating),
            _react2['default'].createElement('input', { type: 'number',
              name: this.props.name,
              value: this.state.currentRatingVal,
              style: { display: 'none !important' },
              min: this.min,
              max: this.max,
              readOnly: true })
          )
        )
      );
    }
  }]);

  return StarRating;
})(_react2['default'].Component);

exports['default'] = StarRating;
module.exports = exports['default'];