import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FromPage from './screens/from-page/FromPage';
import LandingPage from './screens/landing-page/LandingPage';
import ServiceSelectionPage from './screens/service-selection-page/ServiceSelectionPage';

import './App.css';
import { ContextProvider } from './Context';
import ErrorPage from './components/error-page/ErrorPage';

function App() {
  try {
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
              {/* TODO: update route name to something better */}
              <Route path="/fromServiceSelection" element={<FromPage />} />
              <Route path="*" element={<ErrorPage errorDescription="Unrecognized URL" />} />
            </Routes>
          </div>
        </Router>
      </ContextProvider>
    );
  } catch (exception) {
    console.error("Top level error catch: " + exception);
    return <ErrorPage errorDescription="Something went wrong. Please try again." />
  }
}

export default App;
