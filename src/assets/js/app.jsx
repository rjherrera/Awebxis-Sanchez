import React from 'react';
import ReactDOM from 'react-dom';
import RootWantIt from './want-app/components/rootWantIt';
import FollowsApp from './follows-app/components/FollowsApp';
import InteractionsApp from './interactions-app/components/InteractionsApp';

const reactFollowsAppContainer = document.getElementById('follows-app');
const reactInteractionsAppContainer = document.getElementById('interactions-app');


const wantItContainer = document.getElementById('want-it');


if (reactFollowsAppContainer) {
  ReactDOM.render(
    <FollowsApp serverData={reactFollowsAppContainer.dataset} />,
    reactFollowsAppContainer,
  );

}

if (wantItContainer) {
  ReactDOM.render(<RootWantIt serverData={wantItContainer.dataset} />, wantItContainer);
}

if (reactInteractionsAppContainer) {
  ReactDOM.render(
    <InteractionsApp serverData={reactInteractionsAppContainer.dataset} />,
    reactInteractionsAppContainer,
  );
}
