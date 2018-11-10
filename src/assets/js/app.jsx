import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import RootWantIt from './want-app/components/rootWantIt';

const reactAppContainer = document.getElementById('react-app');

const wantItContainer = document.getElementById('want-it');


if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

if (wantItContainer) {
  ReactDOM.render(<RootWantIt serverData={wantItContainer.dataset} />, wantItContainer);
}
