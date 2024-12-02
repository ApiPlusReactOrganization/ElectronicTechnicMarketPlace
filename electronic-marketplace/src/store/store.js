import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import userReducer from '../store/state/reduserSlises/userSlice'
import categoryReducer from '../store/state/reduserSlises/categorySlice'
import manufacturerReducer from '../store/state/reduserSlises/manufacturerSlice';
import productReducer from '../store/state/reduserSlises/productSlice';
import appSettingSlice from '../store/state/reduserSlises/appSettingSlice';
import roleReducer from '../store/state/reduserSlises/roleSlice'

export const rootReducer = combineReducers({
    user: userReducer,
    role: roleReducer,
    category: categoryReducer,
    manufacturer: manufacturerReducer,
    product: productReducer,
    appSettings: appSettingSlice,
  });

  export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})