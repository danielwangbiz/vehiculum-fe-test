import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSearchJokeList } from 'store/actions/joke';
import LoadingIndicator from '../../../components/LoadingIndicator';

const dropdownHandle = React.createRef();
const searchDropdownHandle = React.createRef();

const GuestLayout = ({ history, children, isFetchingSearchList, getSearchJokeList, searchJokeList }) => {
  const [isMenuBarClicked, setMenuBarClicked] = useState(false);
  const [dropActive, setDropActive] = useState(false);

  const [searchDropActive, setSearchDropActive] = useState(false);
  const [searchInputActive, setSearchInputActive] = useState(false);

  const [searchText, setSearchText] = useState('');

  const onFocus = () => {
    setSearchInputActive(true);
  };

  const onBlur = () => {
    if (!searchText) setSearchInputActive(false);
  };

  const onSearch = useCallback(() => {
    if (searchText) {
      getSearchJokeList(searchText)
        .then(() => setSearchDropActive(true));
    } else {
      setSearchDropActive(false);
    }
  }, [searchText, getSearchJokeList, setSearchDropActive]);

  const handleInputKeypress = useCallback((e) => {
    if (e.nativeEvent.key === 'Enter') {
      onSearch();
    }
  }, [onSearch]);

  const onClickOutsideHandler = useCallback((e) => {
    if (dropActive && dropdownHandle.current && !dropdownHandle.current.contains(e.target)) {
      setDropActive(false);
    }
  }, [dropActive]);

  const onClickOutsideSearchHandler = useCallback((e) => {
    if (searchDropActive && searchDropdownHandle.current && !searchDropdownHandle.current.contains(e.target)) {
      setSearchDropActive(false);
    }
  }, [searchDropActive]);

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
    window.addEventListener('click', onClickOutsideSearchHandler);

    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
      window.removeEventListener('click', onClickOutsideSearchHandler);
    };
  }, [onClickOutsideHandler, onClickOutsideSearchHandler]);

  return (
    <div className="layout">
      <div className={'nav nav-guest ' + (isMenuBarClicked ? 'active' : '')}>
        <div className="container">
          <div className="nav-logo">
            <Link to="/">
              <img src={require('assets/images/vehiculum-logo.png')} alt="logo-img" />
            </Link>
          </div>

          <div className={'nav-menu ' + (isMenuBarClicked ? 'active' : '')}>
            <div className="nav-menu-item">
              SO FUNKTIONIERT'S
            </div>
            <div className="nav-menu-item">
              SONDERANGEBOTE
            </div>
            <div className="dropdown" ref={dropdownHandle}>
              <div className={'selector ' + (dropActive ? 'active' : '')} onClick={() => setDropActive(!dropActive)}>
                  <span className="selector-left">
                    <img src={require('assets/images/shape.png')} alt="user-icon" />
                    MENU BEREICH
                  </span>
                <img src={require('assets/images/path_2.png')} alt="arrow-icon" />
              </div>
            </div>
          </div>

          <span className="header-responsive-item" onClick={() => setMenuBarClicked(!isMenuBarClicked)}>
              <img src={require('assets/images/path_2.png')} alt="arrow-icon" />
            </span>
        </div>
      </div>
      <div className="header">
        <LoadingIndicator isLoading={isFetchingSearchList} />

        <h1 className="header-title">
          The Joke Bible
        </h1>
        <p className="header-description">
          Daily Laughs for you and yours
        </p>
        <div className="header-search-wrapper">
          <div className={'header-search-input ' + (searchInputActive ? 'active' : '')}>
            <input
              type="text"
              className="header-search"
              placeholder="How can we make you laugh today?"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleInputKeypress}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {searchInputActive &&
            <img
              className="header-search-btn"
              src={require('assets/images/search-copy-active.png')}
              alt="search-icon"
              onClick={onSearch}
            />
            }
            {!searchInputActive &&
            <img
              className="header-search-btn"
              src={require('assets/images/search-copy.png')}
              alt="search-icon"
              onClick={onSearch}
            />
            }
          </div>

          <div className={'search-list ' + (searchDropActive ? 'active' : '')} ref={searchDropdownHandle}>
            {searchJokeList !== [] &&
            searchJokeList.map((item) => (
              <Link
                to={`/jokes/${item.id}`}
                key={item.id}
                className="search-item "
                onClick={() => {
                  history.push('/jokes/' + item.id);
                  setSearchDropActive(false);
                }}
              >
                <img src={require('assets/images/red-light.png' || item.icon_url)} alt="blue-light" />
                {item.value}
              </Link>
            ))
            }
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          {children}
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <p className="footer-text">
            GOT JOKERS? GET PAID <br />
            FOR SUBMITTING!
          </p>
          <span className="footer-submit">
              <span>SUBMIT JOKE</span>
              <img src={require('assets/images/path-copy-3.png')} alt="footer-img" />
            </span>
        </div>
      </div>
    </div>
  );
};

GuestLayout.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.any,
};

GuestLayout.propTypes = {
  getSearchJokeList: PropTypes.func.isRequired,
  searchJokeList: PropTypes.any,
  isFetchingSearchList: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  searchJokeList: store.rootReducer.joke.searchJokeList,
  isFetchingSearchList: store.rootReducer.joke.isFetchingSearchList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSearchJokeList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestLayout);
