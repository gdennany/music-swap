import { useState } from 'react';
import { SERVICES } from '../../Constants';

import './StreamingServiceButtons.css';

type MyCallbackType = (serviceName: string) => void;

interface MyComponentProps {
    serviceCallback: MyCallbackType;
}

/**
 * Renders the streaming service buttons on the ServiceSelectionPage.tsx.
 * Button has an image on the left an text on the right, and animates on hover/click.
 */
const StreamingServiceButtons: React.FC<MyComponentProps> = ({ serviceCallback }) => {
    const [clickedService, setClickedService] = useState("");

    const handleClick = (service: string) => {
        // user re-clicked the same serivce button, so reset it's state
        if (clickedService === service) {
            setClickedService("");
            serviceCallback("");
        } else {
            setClickedService(service);
            serviceCallback(service);
        }
    };

    return (
        <div>
            {SERVICES.map((service) => (
                <button
                    className={`button ${clickedService === service ? 'clicked' : 'notClicked'}`}
                    onClick={() => handleClick(service)}
                    key={service}
                >
                    <img src={"/" + service + ".png"} alt="" className="button-image" />
                    <span className="button-text">{service}</span>
                </button>
            ))}
        </div>
    );
};

export default StreamingServiceButtons;
