import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface UserState {
  id: string | null;
}
const initialState: UserState = {id: null};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    reset: state => {
      state.id = null;
    },
  },
});

export const {setId, reset} = userSlice.actions;
export default userSlice.reducer;
export const userId = (state: RootState) => state.user.id;
