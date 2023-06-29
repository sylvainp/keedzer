import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface AccessTokenState {
  value: string | null;
}

const initialState: AccessTokenState = {value: null};
export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetToken: state => {
      state.value = null;
    },
  },
});

export const {setToken, resetToken} = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
export const accessToken = (state: RootState) => state.accessToken.value;
