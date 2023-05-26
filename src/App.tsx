import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FromPage from './screens/from-page/FromPage';
import LandingPage from './screens/landing-page/LandingPage';
import ServiceSelectionPage from './screens/service-selection-page/ServiceSelectionPage';

import './App.css';
import { ContextProvider } from './Context';

function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <LandingPage />
                <ServiceSelectionPage id="serviceSelectionPage" />
              </>
            } />
            <Route path="/fromServiceSelection" element={<FromPage />} />
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
