import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/login";
import ForgotPage from "./pages/auth/forgot";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot" element={<ForgotPage />} />
              {/*<Route path="/dashboard" element={<Dashboard />} />*/}
              <Route
                  path="*"
                  element={
                      <main style={{ padding: "1rem" }}>
                          <p>404 PAGE</p>
                      </main>
                  }
              />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
