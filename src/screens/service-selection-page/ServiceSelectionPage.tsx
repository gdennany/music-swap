import { useState } from "react";
import StreamingServiceButtons from "../../components/streaming-service-buttons/StreamingServiceButtons";
import "./ServiceSelectionPage.css";

interface ServiceSelectionPageProps extends React.HTMLAttributes<HTMLDivElement> {};

const EMPTY = '_______';

const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ id, ...rest }) => {
    const [fromService, setFromService] = useState(EMPTY);
    const [toService, setToService] = useState(EMPTY);

    const fromCallBack = (service: string) => {
        console.log('fromCallBack: ' + service);
        setFromService(getTitle(service))
    };

    const toCallBack = (service: string) => {
        console.log('toCallBack: ' + service);
        setToService(getTitle(service))
    };

    const getTitle = (service: string) => {
        if (service.length === 0) {
            return EMPTY;
        }
        return service;
    }

    return  (
    <div className="streaming-service-page" id={id} {...rest}>
        <div className="title">
            <h1>Streaming Services</h1>
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
        </div>
      </div>
    );
    
}

export default ServiceSelectionPage;
