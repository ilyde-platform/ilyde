import { Workspaces } from './components/TestComponents.js';
import { ProjectsList } from './features/projects/ProjectsList';
import { DatasetsSharedList } from './features/datasets/DatasetsSharedList';
import { ProjectForm } from './features/projects/ProjectForm';


export const routes = [
  {
    path: "/new-project",
    component: ProjectForm,
    exact: true,
  },
  {
    path: "/projects",
    component: ProjectsList,
    exact: true,
    componentProps: {
      state: "OPEN",
      pageTitle: "Projects"
    }
  },
  {
    path: "/archive",
    component: ProjectsList,
    exact: true,
    componentProps: {
      state: "CLOSED",
      pageTitle: "Archives"
    }
  },
  {
    path: "/datasets",
    component: DatasetsSharedList,
    exact: true,
  },
  {
    path: "/projects/:id/workspaces",
    component: Workspaces,
    exact: true
  }
];

export default routes;
