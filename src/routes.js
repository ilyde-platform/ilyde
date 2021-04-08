import { Workspaces } from './components/TestComponents.js';
import { ProjectsList } from './features/projects/ProjectsList';
import { DatasetsSharedList } from './features/datasets/DatasetsSharedList';
import { ProjectForm } from './features/projects/ProjectForm';
import { ProjectFiles } from './features/projects/ProjectFiles';
import { DatasetDetail } from './features/datasets/DatasetDetail';


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
    path: "/datasets/:datasetId",
    component: DatasetDetail,
    exact: true,
  },
  {
    path: "/projects/:projectId/files",
    component: ProjectFiles,
    exact: true
  },
  {
    path: "/projects/:projectId/workspaces",
    component: Workspaces,
    exact: true
  }
];

export default routes;
