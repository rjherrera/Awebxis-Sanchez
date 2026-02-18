import { createRoot } from 'react-dom/client';
import HaveItApp from './instance-app/components/HaveItApp';
import WantItApp from './want-app/components/WantItApp';
import FollowsApp from './follows-app/components/FollowsApp';
import InteractionsApp from './interactions-app/components/InteractionsApp';
import TokenApp from './token-app/components/TokenApp';
import StatsApp from './stats-app/components/StatsApp';

import Store from './utils/store';

const reactFollowsAppContainer = document.getElementById('follows-app');
const reactInteractionsAppContainer = document.getElementById('interactions-app');
const wantItAppContainer = document.getElementById('want-it');
const haveItAppContainer = document.getElementById('have-it');
const reactTokenAppContainer = document.getElementById('token-app');
const reactStatsAppContainer = document.getElementById('stats-app');

const store = new Store();

if (reactFollowsAppContainer) {
  createRoot(reactFollowsAppContainer).render(
    <FollowsApp serverData={reactFollowsAppContainer.dataset} />,
  );
}

if (reactStatsAppContainer) {
  createRoot(reactStatsAppContainer).render(
    <StatsApp serverData={reactStatsAppContainer.dataset} store={store} />,
  );
}

if (wantItAppContainer) {
  createRoot(wantItAppContainer).render(
    <WantItApp serverData={wantItAppContainer.dataset} store={store} />,
  );
}

if (haveItAppContainer) {
  createRoot(haveItAppContainer).render(
    <HaveItApp serverData={haveItAppContainer.dataset} store={store} />,
  );
}

if (reactInteractionsAppContainer) {
  createRoot(reactInteractionsAppContainer).render(
    <InteractionsApp serverData={reactInteractionsAppContainer.dataset} />,
  );
}

if (reactTokenAppContainer) {
  createRoot(reactTokenAppContainer).render(<TokenApp />);
}
