import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { EnvironmentsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const idesAdapter = createEntityAdapter();

const initialState = idesAdapter.getInitialState({
  status: 'idle',
  total: 0,
  error: null,
});

export const fetchIdes = createAsyncThunk('ides/fetchIdes', async (body) => {
  const apiConfig = getIlydeApiConfiguration();
  const environmentsApi = new EnvironmentsApi(apiConfig);
  const ides = environmentsApi.listIde(100, 1).then((response) => {
    return response.data;
  });
  return ides;
});

const idesSlice = createSlice({
  name: 'ides',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIdes.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchIdes.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.total = action.payload.total;
      idesAdapter.upsertMany(state, action.payload.data);
    },
    [fetchIdes.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const idesReducer = idesSlice.reducer;
export default idesReducer;

export const {
  selectAll: selectAllIdes,
  selectById: selectIdeById,
} = idesAdapter.getSelectors((state) => state.ides);
