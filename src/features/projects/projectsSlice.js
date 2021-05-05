import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';
import { ProjectsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const projectsAdapter = createEntityAdapter();

const initialState = projectsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (body) => {
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  const projects = projectsApi.listProjects(body).then((response) => {
    return response.data;
  });
  return projects;
});

export const retrieveProject = createAsyncThunk('projects/retrieveProject', async (projectId) => {
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  const project = projectsApi.retrieveProject(projectId).then((response) => {
    return response.data;
  });
  return project;
});

export const addNewProject = createAsyncThunk(
  'projects/addNewProject',
  async (body, { rejectWithValue }) => {
    const apiConfig = getIlydeApiConfiguration();
    const projectsApi = new ProjectsApi(apiConfig);
    const project = projectsApi.createProject(body).then((response) => {
      return response.data;
    });
    return project;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      projectsAdapter.upsertMany(state, action.payload.data);
    },
    [fetchProjects.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewProject.fulfilled]: projectsAdapter.addOne,
    [retrieveProject.fulfilled]: projectsAdapter.addOne,
  },
});

const projectsReducer = projectsSlice.reducer;
export default projectsReducer;

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state) => state.projects);

export const selectProjectsByState = createSelector(
  [selectAllProjects, (state, projectState) => projectState],
  (projects, projectState) => projects.filter((project) => project.state === projectState)
);
