import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FromPage from './screens/from-page/FromPage';
import LandingPage from './screens/landing-page/LandingPage';
import ServiceSelectionPage from './screens/service-selection-page/ServiceSelectionPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div>
              <LandingPage />
              <ServiceSelectionPage id="serviceSelectionPage" />
            </div>
          } />
          <Route path="/fromServiceSelection" element={
            <div>
              <FromPage />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
