import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { DatasetsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const datasetsAdapter = createEntityAdapter();

const initialState = datasetsAdapter.getInitialState({
  status: 'idle',
  total: 0,
  error: null,
});

export const fetchDatasets = createAsyncThunk('datasets/fetchDatasets', async () => {
  const apiConfig = getIlydeApiConfiguration();
  const datasetsApi = new DatasetsApi(apiConfig);
  const body = {"limit": 100, "page": 1, "query":{
      "scope": "Global",
      "project": ""
    }
  }
  const datasets = datasetsApi.listDatasets(body).then((response) => {
    return response.data;
  });
  return datasets;
});

export const addNewDataset = createAsyncThunk(
  'datasets/addNewDataset',
  async (body, { rejectWithValue }) => {
    const apiConfig = getIlydeApiConfiguration();
    const datasetsApi = new DatasetsApi(apiConfig);
    const dataset = datasetsApi.createDataset(body).then((response) => {
      return response.data;
    });
    return dataset;
  }
);

const datasetsSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {
    removeDataset(state, action) {
      datasetsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: {
    [fetchDatasets.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchDatasets.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.total = action.payload.total;
      datasetsAdapter.upsertMany(state, action.payload.data);
    },
    [fetchDatasets.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewDataset.fulfilled]: datasetsAdapter.addOne,
  },
});

export const { removeDataset } = datasetsSlice.actions;

const datasetsReducer = datasetsSlice.reducer;

export default datasetsReducer;

export const {
  selectAll: selectAllDatasets,
  selectById: selectDatasetById,
} = datasetsAdapter.getSelectors((state) => state.datasets);
