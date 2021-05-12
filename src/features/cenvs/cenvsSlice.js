import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { EnvironmentsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const cenvsAdapter = createEntityAdapter();

const initialState = cenvsAdapter.getInitialState({
  status: 'idle',
  total: 0,
  error: null,
});

export const fetchCenvs = createAsyncThunk('cenvs/fetchCenvs', async () => {
  const apiConfig = getIlydeApiConfiguration();
  const environmentsApi = new EnvironmentsApi(apiConfig);
  const cenvs = environmentsApi.listEnvironments(100, 1).then((response) => {
    return response.data;
  });
  return cenvs;
});

const cenvsSlice = createSlice({
  name: 'cenvs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCenvs.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCenvs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.total = action.payload.total;
      cenvsAdapter.upsertMany(state, action.payload.data);
    },
    [fetchCenvs.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const cenvsReducer = cenvsSlice.reducer;
export default cenvsReducer;

export const {
  selectAll: selectAllCenvs,
  selectById: selectCenvById,
} = cenvsAdapter.getSelectors((state) => state.cenvs);

export const selectCenvsByDeployment = createSelector(
  [selectAllCenvs, (state, isDeployment) => isDeployment],
  (cenvs, isDeployment) => cenvs.filter((cenv) => cenv.deployment === isDeployment)
);
