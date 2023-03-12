import LandingPage from './screens/landing-page/LandingPage';
import ServiceSelectionPage from './screens/service-selection-page/ServiceSelectionPage';

import './App.css';

function App() {
  return (
  <div className="App">
    <LandingPage />
    <ServiceSelectionPage id="serviceSelectionPage" />
  </div>
  
  );
}

export default App;
