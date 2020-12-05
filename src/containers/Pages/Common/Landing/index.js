import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getJokeList, initJokeList } from 'store/actions/joke';

import './style.scss';
import LoadingIndicator from 'components/LoadingIndicator';

const CATEGORY_BTN_LIST = [
  { category: 'animal', name: 'Animal' },
  { category: 'career', name: 'Career' },
  { category: 'celebrity', name: 'Celebrity' },
  { category: 'dev', name: 'Dev' },
  { category: 'explicit', name: 'Explicit' },
  { category: 'fashion', name: 'Fashion' },
  { category: 'food', name: 'Food' },
  { category: 'history', name: 'History' },
  { category: 'money', name: 'Money' },
  { category: 'movie', name: 'Movie' },
  { category: 'music', name: 'Music' },
  { category: 'political', name: 'Political' },
  { category: 'religion', name: 'Religion' },
  { category: 'science', name: 'Science' },
  { category: 'sport', name: 'Sport' },
  { category: 'travel', name: 'Travel' },
  { category: 'uncategorized', name: 'UnCategorized' },
];

const LandingPage = ({ initJokeList, getJokeList, jokeList, isFetchingList }) => {
  const [currentCategory, setCurrentCategory] = useState(CATEGORY_BTN_LIST[0].category);

  const selectCategory = (category) => {
    initJokeList();
    setCurrentCategory(category);
  };

  const getMoreJokes = () => {
    getJokeList(currentCategory);
  };

  useEffect(() => {
    getJokeList(currentCategory);
  }, [getJokeList, currentCategory]);

  return (
    <div className="landing-page">
      <LoadingIndicator isLoading={isFetchingList} fullScreen />
      <div className="category-section">
        {
          CATEGORY_BTN_LIST.map((btn) => (
            <span
              key={btn.category}
              className={'category-btn cat-' + btn.category}
              onClick={() => selectCategory(btn.category)}
            >
                {btn.name}
              </span>
          ))
        }
      </div>
      <div className="category-detail">
        <div className="category-header">
            <span className={'category-title ' + currentCategory}>
              {
                CATEGORY_BTN_LIST.find((item) => (item.category === currentCategory))
                  ? CATEGORY_BTN_LIST.find((item) => (item.category === currentCategory)).name : 'UnCategorized'
              }
            </span>
        </div>
        <div className="category-body">
          {!!jokeList.length &&
          jokeList.map((joke, index) => (
            <div key={joke.id} className="joke-card">
              <div className="card-title">
                <img src={require('assets/images/green-light-copy.png')} alt="light" />
                Category: {(joke.categories || []).join(', ')}
              </div>
              <p className="card-description">
                {joke.value}
              </p>
              <Link to={`/jokes/${joke.id}`} className="card-detail">
                SEE STATS
                <img src={require('assets/images/path.png')} alt="stats" />
              </Link>
            </div>
          ))
          }
        </div>
        <div className="category-footer">
            <span className="more-btn" onClick={getMoreJokes}>
              VIEW MORE
              <img src={require('assets/images/path-copy-7.png')} alt="path-img" />
            </span>
        </div>
      </div>

    </div>
  );
};

LandingPage.propTypes = {
  getJokeList: PropTypes.func.isRequired,
  initJokeList: PropTypes.func.isRequired,
  jokeList: PropTypes.any,
  isFetchingList: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  jokeList: store.rootReducer.joke.jokeList,
  isFetchingList: store.rootReducer.joke.isFetchingList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getJokeList,
  initJokeList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
