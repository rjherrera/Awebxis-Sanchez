import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import RootHaveIt from './instance-app/components/rootHaveIt';
import FollowsApp from './follows-app/components/FollowsApp';

const reactFollowsAppContainer = document.getElementById('follows-app');

const haveItContainer = document.getElementById('have-it');

if (reactFollowsAppContainer) {
  ReactDOM.render(
    <FollowsApp serverData={reactFollowsAppContainer.dataset} />,
    reactFollowsAppContainer,
  );
}

if (haveItContainer) {
  ReactDOM.render(<RootHaveIt serverData={haveItContainer.dataset} />, haveItContainer);
}
