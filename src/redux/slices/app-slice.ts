import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppState {}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
