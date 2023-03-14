import { useState } from "react";
import StreamingServiceButtons from "../../components/streaming-service-buttons/StreamingServiceButtons";
import "./ServiceSelectionPage.css";

interface ServiceSelectionPageProps extends React.HTMLAttributes<HTMLDivElement> {};

const EMPTY = '_______';

/**
 * Page where the user selects which streaming services they want to swap to/from.
 */
const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ id, ...rest }) => {
    const [fromService, setFromService] = useState(EMPTY);
    const [toService, setToService] = useState(EMPTY);

    const fromCallBack = (service: string) => {
        console.log('service: ' + service)
        setFromService(getTitle(service))
    };

    const toCallBack = (service: string) => {
        console.log('service: ' + service)
        setToService(getTitle(service))
    };

    const getTitle = (service: string) => {
        if (service.length === 0) {
            return EMPTY;
        }
        return service;
    }

    const getShowSwapButton = () => {
        if (fromService !== EMPTY 
            && toService !== EMPTY
            && fromService !== toService
        ) {
            console.log('show')
            return true;
        }
        console.log('hide')
        return false;
    }

    return  (
    <div className="streaming-service-page" id={id} {...rest}>
        <div className="title">
            <h1>Streaming Service Selection</h1>
        </div>
  
        <div className="button-column-container">
            <div className="button-column">
                <h2>From:</h2>
                <StreamingServiceButtons serviceCallback={fromCallBack} />
            </div>
            <div className="button-column">
                <h2>To:</h2>
                <StreamingServiceButtons serviceCallback={toCallBack} />
            </div>
        </div>
  
        <div className="text-block">
            <p>Swapping music from {fromService} to {toService}</p>
            <button className={`rainbow-button ${getShowSwapButton() ? '' : 'hide'}`}>
                Summon Swapping Sequence!
            </button>
        </div>
      </div>
    );
    
}

export default ServiceSelectionPage;
