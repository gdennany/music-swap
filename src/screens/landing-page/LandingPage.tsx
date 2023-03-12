import { useState } from "react";
import { DownArrowButton } from "../../components/down-arrow-button/DownArrowButton";

import "./LandingPage.css";

const LandingPage = () => {
    const [isWizardSpinning, setIsWizardSpinning] = useState(false);

    function handleWizardClick() {
        setIsWizardSpinning(!isWizardSpinning);
    }
    
    return (
    <div className="container">
        <div className="top-section">
            <div className="image-container">
                <img src="/MusicSwapLogo.png" alt="Music Swap Logo" />
            </div>
        </div>
        
        <div className="bottom-section">
            <div className="left-section">
                <div className="wizard-container">
                    <img
                      src="/Wizard.gif"
                      alt="Wizard" 
                      className={isWizardSpinning ? "wizardSpin" : ""}
                      onClick={handleWizardClick}
                    />
                </div>
            </div>
            <div className="right-section">
                <p className="futuristic-text">Some text for the bottom right section</p>
            </div>
        </div>

        <DownArrowButton />
    </div>
  );
}

export default LandingPage;
