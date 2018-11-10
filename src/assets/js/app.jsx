import React from 'react';
import ReactDOM from 'react-dom';
import RootWantIt from './want-app/components/rootWantIt';
import FollowsApp from './follows-app/components/FollowsApp';

const reactFollowsAppContainer = document.getElementById('follows-app');


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
