import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { AuthByToken } from "./store/state/actions/userActions";

if (localStorage.token) {
  AuthByToken(localStorage.token)(store.dispatch);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
        <App />
     </Provider>
  </StrictMode>,
)
