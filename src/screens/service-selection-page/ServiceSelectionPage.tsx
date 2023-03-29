import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import ConfirmServicesModal from "../../components/comfirm-services-modal/ConfirmServicesModal";
import StreamingServiceButtons from "../../components/streaming-service-buttons/StreamingServiceButtons";

import "./ServiceSelectionPage.css";

interface ServiceSelectionPageProps extends React.HTMLAttributes<HTMLDivElement> {};

const EMPTY = '_______';

/**
 * Page where the user selects which streaming services they want to swap to/from.
 */
const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ id, ...rest }) => {
    const navigate = useNavigate();
    const [fromService, setFromService] = useState(EMPTY);
    const [toService, setToService] = useState(EMPTY);
    const [showConfirmServicesModal, setShowConfirmServicesModal] = useState(false);
    
    const fromCallBack = (service: string) => {
        setFromService(getTitle(service))
    };

    const toCallBack = (service: string) => {
        setToService(getTitle(service))
    };

    const getTitle = (service: string) => {
        if (service.length === 0) {
            return EMPTY;
        }
        return service;
    }

    const getShowSwapButton = () => {
        return fromService !== EMPTY 
            && toService !== EMPTY
            && fromService !== toService;
    }

    const handleModalContinue = () => {
        // handle continue button click
        console.log('continue modal')
        console.log('from: ' + fromService)
        console.log('to: ' + toService)
        
        navigate('/fromServiceSelection', { 
            state: { 
              fromService,
              toService,
            },
          });
    };
    
    const handleModalCancel = () => {
        // handle cancel button click
        setShowConfirmServicesModal(false);
    };

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
            <button
              className={`rainbow-button ${getShowSwapButton() ? '' : 'hide'}`}
              onClick={() => setShowConfirmServicesModal(true)}
              >
                Summon Swapping Sequence!
            </button>
            {showConfirmServicesModal && (
              <ConfirmServicesModal
                from={fromService}
                to={toService}
                onContinue={handleModalContinue}
                onCancel={handleModalCancel}
              />
      )}
        </div>
      </div>
    );
    
}

export default ServiceSelectionPage;
