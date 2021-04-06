import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { ModelapisApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const modelapisAdapter = createEntityAdapter();

const initialState = modelapisAdapter.getInitialState({
  status: 'idle',
  total: 0,
  error: null,
});

export const fetchModelapis = createAsyncThunk('modelapis/fetchModelapis', async () => {
  const apiConfig = getIlydeApiConfiguration();
  const modelapisApi = new ModelapisApi(apiConfig);
  const body = {"limit": 100, "page": 1, "query":{
      "state": "RUNNING"
    }
  }
  const modelapis = modelapisApi.listModelapis(body).then((response) => {
    return response.data;
  });
  return modelapis;
});

const modelapisSlice = createSlice({
  name: 'modelapis',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchModelapis.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchModelapis.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.total = action.payload.total;
      modelapisAdapter.upsertMany(state, action.payload.data);
    },
    [fetchModelapis.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const modelapisReducer = modelapisSlice.reducer;
export default modelapisReducer;

export const {
  selectAll: selectAllModelapis,
  selectById: selectModelapiById,
} = modelapisAdapter.getSelectors((state) => state.modelapis);
