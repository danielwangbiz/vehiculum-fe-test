import React from 'react';
import Routes from 'containers/Routes';

const App = ({ ...rest }) => {
  return (
    <div className="app">
      <Routes {...rest} />
    </div>
  );
};

export default App;
