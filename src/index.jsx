var React = require('react');
var StarRating = require('./components/StarRating.jsx');

var inject = document.querySelector('.inject');

var App = React.createClass({

  handleRatingClick: function (e, data) {
    alert('You left a ' + data.rating + ' star rating for ' + data.caption);
  },

  render: function () {
    return (
    	<section>
        <div className="intro">
          <h1 className="main-title">
            {'react-star-rating'} <br/> <small> easy star ratings with React</small>
          </h1>
          <StarRating name="hotels" size="md" rating={5} editing={true} ratingAmount={5} step={1} />
        </div>
        <div className="ratings-wrap">
          <h2>Installation</h2>
          <hr/>
          <code>
            {'$ npm install react-star-rating --save'}
          </code>
          <h2>Usage</h2>
          <hr/>
          <p>You can use react-star-rating with Browserify or by simply including it as a script tag in your page.</p>
          <code>
            <p>{'// Browserify'}</p>
            <p>{'var StarRating = require(\'StarRating\');'}</p>
            <p>{'// Script Tag'}</p>
            {'<script src=".../react-star-rating.min.js">'}
          </code>
          <h2>Examples</h2>
          <hr/>
          <StarRating name="hotels" caption="Hotel Rating!" ratingAmount={5} step={0.5} onRatingClick={this.handleRatingClick} />
          <code>
            {'<StarRating name="hotels" caption="Hotels!" ratingAmount={5} step={0.5} onRatingClick={this.handleRatingClick} />'}
          </code>
          <StarRating name="restaurants" caption="Restaurants!" ratingAmount={10} step={1} onRatingClick={this.handleRatingClick} />
          <code>
            {'<StarRating name="restaurants" caption="Restaurants!" ratingAmount={10} step={1} onRatingClick={this.handleRatingClick} />'}
          </code>
          <StarRating name="movie-ratings" caption="Movie Ratings!" ratingAmount={5} rating={3.5} />
          <code>
            {'<StarRating name="movie-ratings" caption="Movie Ratings!" ratingAmount={5} rating={3.5} />'}
          </code>
          <StarRating name="movie-ratings" caption="Movie Ratings!" ratingAmount={10} onRatingClick={this.handleRatingClick} />
          <code>
            {'<StarRating name="movie-ratings" caption="Movie Ratings!" ratingAmount={10} onRatingClick={this.handleRatingClick} />'}
          </code>
          <StarRating name="movie-ratings" caption="Movie Ratings!" ratingAmount={5} rating={3} disabled={true} />
          <code>
            {'<StarRating name="movie-ratings" caption="Movie Ratings!" ratingAmount={5} rating={3} disabled={true} />'}
          </code>
        </div>
        <footer>
          <p className="footer-creds">
            Created by <a href="http://twitter.com/cameronjroe">@cameronjroe</a>
          </p>
        </footer>
    	</section>
    );
  }

});

React.render(<App />, inject);