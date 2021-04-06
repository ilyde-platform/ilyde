import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { UsersApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  total: 0,
  error: null,
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const apiConfig = getIlydeApiConfiguration();
  const usersApi = new UsersApi(apiConfig);
  const users = usersApi.listUsers().then((response) => {
    return response.data;
  });
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.total = action.payload.total;
      usersAdapter.upsertMany(state, action.payload.data);
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.errr.message;
    },
  },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);
