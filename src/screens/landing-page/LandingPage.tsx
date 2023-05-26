import { useEffect, useState } from "react";
import { DownArrowButton } from "../../components/down-arrow-button/DownArrowButton";

import "./LandingPage.css";

/**
 * Landing page. Shows the logo and copy explaining what MusicSwap does.
 */
const LandingPage = () => {
    const [isWizardSpinning, setIsWizardSpinning] = useState(false);

    function handleWizardClick() {
        setIsWizardSpinning(!isWizardSpinning);
    }

    return (
        <div className="container">
            <div className="top-section">
                <div className="logo-container">
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
                    <p className="futuristic-text">
                        Tired of your old streaming service?
                        <br />
                        <br />
                        Now it's never been easier to transfer your old library to your new streaming service.
                    </p>
                </div>
            </div>

            <DownArrowButton />
        </div>
    );
}

export default LandingPage;
