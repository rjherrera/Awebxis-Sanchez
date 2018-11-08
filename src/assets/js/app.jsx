import React from 'react';
import ReactDOM from 'react-dom';
import FollowsApp from './follows-app/components/FollowsApp';

const reactFollowsAppContainer = document.getElementById('follows-app');

if (reactFollowsAppContainer) {
  ReactDOM.render(
    <FollowsApp serverData={reactFollowsAppContainer.dataset} />,
    reactFollowsAppContainer,
  );
}
