import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeContainer from './pages/home/HomeContainer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <HomeContainer />
    </Provider>
  );
}

export default App;
