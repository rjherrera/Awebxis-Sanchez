import React from 'react';
import ReactDOM from 'react-dom';
import RootHaveIt from './instance-app/components/rootHaveIt';
import WantItApp from './want-app/components/WantItApp';
import FollowsApp from './follows-app/components/FollowsApp';
import InteractionsApp from './interactions-app/components/InteractionsApp';
import TokenApp from './token-app/components/TokenApp';

import Store from './utils/store';

const reactFollowsAppContainer = document.getElementById('follows-app');
const reactInteractionsAppContainer = document.getElementById('interactions-app');
const wantItAppContainer = document.getElementById('want-it');
const haveItAppContainer = document.getElementById('have-it');
const reactTokenAppContainer = document.getElementById('token-app');

const store = new Store();

if (reactFollowsAppContainer) {
  ReactDOM.render(
    <FollowsApp serverData={reactFollowsAppContainer.dataset} />,
    reactFollowsAppContainer,
  );
}

if (wantItAppContainer) {
  ReactDOM.render(<WantItApp
    serverData={wantItAppContainer.dataset}
    store={store}
  />, wantItAppContainer);
}

if (haveItAppContainer) {
  ReactDOM.render(<RootHaveIt serverData={haveItAppContainer.dataset} />, haveItAppContainer);
}

if (reactInteractionsAppContainer) {
  ReactDOM.render(
    <InteractionsApp serverData={reactInteractionsAppContainer.dataset} />,
    reactInteractionsAppContainer,
  );
}

if (reactTokenAppContainer) {
  ReactDOM.render(<TokenApp />, reactTokenAppContainer);
}
