import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeContainer from './pages/home/HomeContainer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <header className="App-header">
        NASA picture of the day
      </header>
      <HomeContainer />
    </Provider>
  );
}

export default App;
