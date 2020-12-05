import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getJokeDetails } from 'store/actions/joke';

import './style.scss';

const topJokeList = [
  {
    id: 0,
    name: 'Smoking Joke',
    link: '#',
  },
  {
    id: 1,
    name: 'My Boss Joke',
    link: '#',
  },
  {
    id: 2,
    name: 'Dirty Millionaire Joke',
    link: '#',
  },
  {
    id: 3,
    name: 'The annoying neighbour',
    link: '#',
  },
  {
    id: 4,
    name: 'Knock Knock',
    link: '#',
  },
  {
    id: 5,
    name: 'why Tyson lisps',
    link: '#',
  },
  {
    id: 6,
    name: 'The drunk Police officer',
    link: '#',
  },
  {
    id: 7,
    name: 'My hip dad (Dad joke)',
    link: '#',
  },
  {
    id: 8,
    name: 'What not to say in an elevator',
    link: '#',
  },
];

const JokeDetailPage = ({ getJokeDetails, isFetchingDetails, details }) => {
  const { id } = useParams();

  useEffect(() => {
    getJokeDetails(id);
  }, [getJokeDetails, id]);

  return (
    <div className="joke-detail-page">
      <Link to="/">
      <span className="back-btn">
        <img src={require('assets/images/arrow-left.png')} alt="back-icon" />
      </span>
      </Link>
      <div className="joke-panel">
        <div className="left-panel">
          <div className="joke-card">
            <div className="card-header">
              {!isFetchingDetails && !!(details.categories && details.categories.length) &&
              <span className="header-left">{details.categories[0]}</span>
              }
              <span className="header-right trending">TRENDING</span>
            </div>

            <div className="title-section">
              <h1 className="card-title">{isFetchingDetails ? '' : (details.value || '').substr(0, 20)}...</h1>
              <div className="title-right">
                <span className="title-line" />
                {/*<span className="title-no">*/}
                {/*  NO #1*/}
                {/*</span>*/}
              </div>
            </div>

            <div className="text-section">
              <p>
                {isFetchingDetails ? 'Loading' : details.value}
              </p>
            </div>
          </div>
          <div className="joke-control">
            <div className="control-left">
              <div className="joke-like">
                <span className="like-wrapper">
                  <img src={require('assets/images/hand.png')} alt="like-icon" />
                </span>
                <p className="like-count">---</p>
              </div>
              <div className="joke-dislike">
                <span className="dislike-wrapper">
                  <img src={require('assets/images/hand-copy.png')} alt="like-icon" />
                </span>
                <p className="dislike-count">---</p>
              </div>
            </div>

            {/*<div className="control-right">*/}
            {/*  <span className="prev-btn">*/}
            {/*    <img src={require('assets/images/arrow-left.png')} alt="prev-btn" />*/}
            {/*    PREV.JOKE */}
            {/*  </span>*/}
            {/*  <span className="next-btn">*/}
            {/*    NEXT JOKE*/}
            {/*    <img src={require('assets/images/arrow-left-copy.png')} alt="prev-btn" />*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="right-panel">
          <h2 className="right-title">
            THE TOP 10 JOKERS THIS WEEK
          </h2>
          <div className="joke-list">
            {
              topJokeList.map((joke) => (
                <Link key={joke.id} to={joke.link} className="list-item">
                  {joke.name}
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

JokeDetailPage.propTypes = {
  getJokeDetails: PropTypes.func.isRequired,
  details: PropTypes.any,
  isFetchingDetails: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  details: store.rootReducer.joke.details,
  isFetchingDetails: store.rootReducer.joke.isFetchingDetails,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getJokeDetails,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JokeDetailPage);
