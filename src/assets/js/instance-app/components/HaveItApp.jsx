import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import HaveIt from './HaveIt';


function HaveItApp({ serverData, store }) {
  return (
    <HaveIt
      username={serverData.username}
      bookId={serverData.bookId}
      bookInstancePath={serverData.bookInstancePath}
      store={store}
    />
  );
}

HaveItApp.propTypes = {
  serverData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    bookId: PropTypes.string.isRequired,
    bookInstancePath: PropTypes.string.isRequired,
  }).isRequired,
  store: PropTypes.shape({}).isRequired,
};

export default hot(module)(HaveItApp);
