'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

// TODO:
// - abstract mixin for mouse tracking
// - finish updating svgs on hover, state changes
// - implement tests
// 
/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   totalStars={number} - the total amount of stars (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={string} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */
class StarRating extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string,
    totalStars: React.PropTypes.number.isRequired,
    rating: React.PropTypes.number,
    onRatingClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    editing: React.PropTypes.bool,
    size: React.PropTypes.string
  }

  static defaultProps = {
    step: 0.5,
    totalStars: 5,
    onRatingClick() {},
    disabled: false
  }

  constructor(props) {
    super(props);

    this.state = {
      ratingCache: {
        pos: 0,
        rating: 0
      },
      editing: props.editing || true,
      stars: 5,
      rating: 0,
      pos: 0,
      glyph: this.getStars()
    };
  }

  componentWillMount() {
    this.min = 0;
    this.max = this.props.totalStars || 5;
    if (this.props.rating) {

      this.state.editing = this.props.editing || false;
      var ratingVal = this.props.rating;
      this.state.ratingCache.pos = this.getStarRatingPosition(ratingVal);

      this.setState({
        ratingCache: this.state.ratingCache,
        rating: ratingVal,
        pos: this.getStarRatingPosition(ratingVal)
      });
    }
  }

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this.refs.root);
    this.ratingContainer = ReactDOM.findDOMNode(this.refs.ratingContainer);
  }

  componentWillUnmount() {
    delete this.root;
    delete this.ratingContainer;
  }

  /**
   * Gets the stars based on totalStars
   * @return {string} stars
   */
  getStars() {
    var stars = '';
    var numRating = this.props.totalStars;
    for(var i = 0; i < numRating; i++) {
      stars += '\u2605';
    }
    return stars;
  }

  /**
   * Gets the mouse position
   * @param  {event} e
   * @return {number} delta
   */
  getPosition(e) {
    return e.clientX - this.root.getBoundingClientRect().left;
  }

  getWidthFromValue(val) {
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

  applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  }

  getDecimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  getValueFromPosition(pos) {
    var precision = this.getDecimalPlaces(this.props.step);
    var maxWidth = this.ratingContainer.offsetWidth;
    var diff = this.max - this.min;
    var factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
    val = Math.max(Math.min(val, this.max), this.min);
    return val;
  }

  calculate(pos) {
    var val = this.getValueFromPosition(pos),
        width = this.getWidthFromValue(val);

    width += '%';
    return {width, val};
  }

  getStarRatingPosition(val) {
    var width = this.getWidthFromValue(val) + '%';
    return width;
  }

  getRatingEvent(e) {
    var pos = this.getPosition(e);
    return this.calculate(pos);
  }

  /**
   * Get Star SVG
   * TODO:
   * // - implement hover colors
   * // - implement
   */
  getSvg(rating) {
    var stars = [];
    for(var i = 0; i < this.props.totalStars; i++) {
      var attrs = {};
      attrs['transform'] = `translate(${i*50}, 0)`;
      stars.push(<path key={`star-${i}`} {...attrs} d="m0,18.1l19.1,0l5.9,-18.1l5.9,18.1l19.1,0l-15.4,11.2l5.9,18.1l-15.4,-11.2l-15.4,11.2l5.9,-18.1l-15.4,-11.2l0,0z"/>);
    }

    var styles = {
      width: `${stars.length * 50}px`,
      height: '50px'
    };

    return (
      <svg className="rsr__star" 
        style={styles} 
        viewBox={`0 0 ${stars.length} 50`} 
        preserveAspectRatio="xMinYMin meet" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg">
        <g>
          {stars.map((item) => {
            return item;
          })}
        </g>
      </svg>
    );
  }

  updateRating(width, val) {
    this.setState({
      pos: width,
      rating: val
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.updateRating(
        this.getStarRatingPosition(nextProps.rating),
        nextProps.rating
      );
      return true;
    } else {
      return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating;
    }
  }

  handleMouseLeave() {
    this.setState({
      pos: this.state.ratingCache.pos,
      rating: this.state.ratingCache.rating
    });
  }

  handleMouseMove(e) {
    // get hover position
    var ratingEvent = this.getRatingEvent(e);
    this.updateRating(
      ratingEvent.width,
      ratingEvent.val
    );
  }

  handleClick(e) {
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    var ratingCache = {
      pos: this.state.pos,
      rating: this.state.rating,
      caption: this.props.caption,
      name: this.props.name
    };

    this.setState({
      ratingCache: ratingCache
    });

    this.props.onRatingClick(e, ratingCache);
  }

  treatName(title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_');
    }
  }

  render() {
    var caption = null;
    var classes = cx({
      'rsr-root': true,
      'rsr--disabled': this.props.disabled,
      ['rsr--' + this.props.size]: this.props.size,
      'rsr--editing': this.state.editing
    });

    // is there a caption?
    if (this.props.caption) {
      caption = (<span className="rsr__caption">{this.props.caption}</span>);
    }

    var attrs = {};
    if (this.state.editing) {
      attrs['onMouseMove'] = this.handleMouseMove.bind(this);
      attrs['onMouseLeave'] = this.handleMouseLeave.bind(this);
      attrs['onClick'] = this.handleClick.bind(this);
    }

    return (
      <span className="rsr-container">
        {caption}
        <div ref="root" className={classes}>
          <div ref="ratingContainer"
            className="rsr rating-gly-star"
            data-content={this.state.glyph} {...attrs}>
            {/*<div className="rsr__stars"
                data-content={this.state.glyph} 
                style={{width: this.state.pos}}>
            </div>*/}
            {this.getSvg(this.state.rating)}
            {/*<input type="number" 
              name={this.props.name} 
              value={this.state.ratingCache.rating} 
              style={{display: 'none !important'}} 
              min={this.min} 
              max={this.max} 
              readOnly />*/}
          </div>
        </div>
      </span>
    );
  }
}

export default StarRating;
