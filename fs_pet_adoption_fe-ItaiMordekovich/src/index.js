import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Components/General/General.css';
import { ToastContainer } from 'react-toastify';
import { store } from './Redux/Store/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import AppWrapper from './AppWrapper';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <AppWrapper />
    <ToastContainer 
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

