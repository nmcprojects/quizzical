import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import Home from './page/Home';
import Start from './page/Start';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/react/quizzical-app/" element={<App />}>
            <Route index element={<Start />}/>
            <Route path="questions" element={<Home />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

