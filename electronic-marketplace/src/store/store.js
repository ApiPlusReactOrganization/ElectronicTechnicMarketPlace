import {  combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/state/reduserSlises/userSlice'
import categoryReducer from '../store/state/reduserSlises/categorySlice'
import { thunk } from 'redux-thunk';
import manufacturerReducer from '../store/state/reduserSlises/manufacturerSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    manufacturer: manufacturerReducer
  });

  export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})