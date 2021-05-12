import { Workspaces } from './components/TestComponents.js';
import { Environments } from './components/Environments.js';
import { Settings } from './components/Settings.js';
import { ProjectsList } from './features/projects/ProjectsList';
import { ModelapisList } from './features/modelapis/ModelapisList';
import { ModelapisDetail } from './features/modelapis/ModelapisDetail';
import { DatasetsSharedList } from './features/datasets/DatasetsSharedList';
import { ProjectForm } from './features/projects/ProjectForm';
import { ProjectFiles } from './features/projects/ProjectFiles';
import { ProjectWorkspaces } from './features/projects/ProjectWorkspaces';
import { ProjectRuns } from './features/projects/ProjectRuns';
import { ProjectRunDetail } from './features/projects/ProjectRunDetail';
import { ProjectExperiments } from './features/projects/ProjectExperiments';
import { ProjectExperimentDetail } from './features/projects/ProjectExperimentDetail';
import { ProjectModels } from './features/projects/ProjectModels';
import { ProjectModelDetail } from './features/projects/ProjectModelDetail';
import { ProjectDetail } from './features/projects/ProjectDetail';
import { ProjectSettings } from './features/projects/ProjectSettings';
import { ProjectDatasets } from './features/projects/ProjectDatasets';
import { ProjectModelApis } from './features/projects/ProjectModelApis';
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
    path: "/settings",
    component: Settings,
    exact: true,
  },
  {
    path: "/environments",
    component: Environments,
    exact: true,
  },
  {
    path: "/modelapis",
    component: ModelapisList,
    exact: true,
  },
  {
    path: "/modelapis/:modelapisId",
    component: ModelapisDetail,
    exact: true,
  },
  {
    path: "/datasets/:datasetId",
    component: DatasetDetail,
    exact: true,
  },
  {
    path: "/projects/:projectId",
    component: ProjectDetail,
    routes: [
      {
        path: "/projects/:projectId/files",
        component: ProjectFiles,
        exact: true
      },
      {
        path: "/projects/:projectId/workspaces",
        component: ProjectWorkspaces,
        exact: true
      },
      {
        path: "/projects/:projectId/runs",
        component: ProjectRuns,
        exact: true
      },
      {
        path: "/projects/:projectId/runs/:runId",
        component: ProjectRunDetail,
        exact: true
      },
      {
        path: "/projects/:projectId/experiments",
        component: ProjectExperiments,
        exact: true
      },
      {
        path: "/projects/:projectId/experiments/:experimentId",
        component: ProjectExperimentDetail,
        exact: true
      },
      {
        path: "/projects/:projectId/models",
        component: ProjectModels,
        exact: true
      },
      {
        path: "/projects/:projectId/models/:modelName",
        component: ProjectModelDetail,
        exact: true
      },
      {
        path: "/projects/:projectId/datasets",
        component: ProjectDatasets,
        exact: true
      },
      {
        path: "/projects/:projectId/datasets/:datasetId",
        component: DatasetDetail,
        exact: true,
      },
      {
        path: "/projects/:projectId/modelapis",
        component: ProjectModelApis,
        exact: true,
      },
      {
        path: "/projects/:projectId/settings",
        component: ProjectSettings,
        exact: true,
      }
    ]
  },

];

export default routes;
