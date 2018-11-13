import React from 'react';
import ReactDOM from 'react-dom';
import FollowsApp from './follows-app/components/FollowsApp';
import InteractionsApp from './interactions-app/components/InteractionsApp';

const reactFollowsAppContainer = document.getElementById('follows-app');
const reactInteractionsAppContainer = document.getElementById('interactions-app');

if (reactFollowsAppContainer) {
  ReactDOM.render(
    <FollowsApp serverData={reactFollowsAppContainer.dataset} />,
    reactFollowsAppContainer,
  );
}

if (reactInteractionsAppContainer) {
  ReactDOM.render(
    <InteractionsApp serverData={reactInteractionsAppContainer.dataset} />,
    reactInteractionsAppContainer,
  );
}
