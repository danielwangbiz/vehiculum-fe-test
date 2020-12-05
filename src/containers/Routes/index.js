import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// Page layout
import GuestLayout from '../Templates/Layout/GuestLayout';

// Common pages
import LandingPage from '../Pages/Common/Landing';
import JokeDetail from '../Pages/Common/JokeDetail';
import ErrorPage from '../Pages/Common/Error';

const Routes = ({ location, ...props }) => {
  return (
    <GuestLayout {...props}>
      <Switch location={location}>
        {/*Guest routes*/}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/jokes/:id" component={JokeDetail} />

        <Route exact component={ErrorPage} />
      </Switch>
    </GuestLayout>
  );
};

Routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  history: PropTypes.object.isRequired,
};

export default Routes;
