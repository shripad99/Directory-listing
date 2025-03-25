import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import productSlice from './store/productSlice.js'
import { configureStore } from '@reduxjs/toolkit';
import './index.css'
import App from './App.jsx'

const store = configureStore({
  reducer: {
    products: productSlice
  }
});

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
