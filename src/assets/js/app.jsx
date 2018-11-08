import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import RootHaveIt from './components/rootHaveIt';

const reactAppContainer = document.getElementById('react-app');

const haveItContainer = document.getElementById('have-it');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

if (haveItContainer) {
  ReactDOM.render(<RootHaveIt serverData={haveItContainer.dataset} />, haveItContainer);
}
