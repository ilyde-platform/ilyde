import { Redirect } from 'react-router';
import { Projects, Archive, Workspaces } from './components/TestComponents.js';


export const routes = [
  {
    path: "/projects",
    component: Projects,
    exact: true
  },
  {
    path: "/archive",
    component: Archive,
    exact: true
  },
  {
    path: "/projects/:id/workspaces",
    component: Workspaces,
    exact: true
  }
];

export default routes;