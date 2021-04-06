
import { configureStore } from '@reduxjs/toolkit';
import headerbarReducer from '../features/headerbar/headerbarSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import usersReducer from '../features/users/usersSlice';
import idesReducer from '../features/ides/idesSlice';
import cenvsReducer from '../features/cenvs/cenvsSlice';
import hwtiersReducer from '../features/hwtiers/hwtiersSlice';
import modelapisReducer from '../features/modelapis/modelapisSlice';
import projectsReducer from '../features/projects/projectsSlice';
import datasetsReducer from '../features/datasets/datasetsSlice';

export default configureStore({
  reducer: {
    headerbar: headerbarReducer,
    preferences: preferencesReducer,
    users: usersReducer,
    ides: idesReducer,
    cenvs: cenvsReducer,
    hwtiers: hwtiersReducer,
    modelapis: modelapisReducer,
    projects: projectsReducer,
    datasets: datasetsReducer,
  },
});
