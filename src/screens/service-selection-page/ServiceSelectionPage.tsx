import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import ConfirmServicesModal from "../../components/comfirm-services-modal/ConfirmServicesModal";
import StreamingServiceButtons from "../../components/streaming-service-buttons/StreamingServiceButtons";
import { Context } from "../../Context";

import "./ServiceSelectionPage.css";

interface ServiceSelectionPageProps extends React.HTMLAttributes<HTMLDivElement> { };

const EMPTY = '_______';

/**
 * Page below landing page where the user selects which streaming services they want to swap to/from.
 */
const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ id, ...rest }) => {
    const navigate = useNavigate();
    const [showConfirmServicesModal, setShowConfirmServicesModal] = useState(false);
    const { fromService, toService, setFromService, setToService } = useContext(Context);

    // reset service selections if you come back to this page.
    useEffect(() => {
        localStorage.setItem('fromService', "");
        localStorage.setItem('toService', "");
        setFromService("");
        setToService("");
    }, []);

    // Streaming service selection callbacks
    const fromCallBack = (service: string) => setFromService(service);
    const toCallBack = (service: string) => setToService(service);

    const shouldShowSummonSwapButton = () => {
        return fromService !== ""
            && toService !== ""
            && fromService !== toService;
    }

    const handleModalContinue = () => {
        //TODO: find better way to handle this than setting to local storage. Issue is when you do a page refresh (required when authorizing to e.g. Spotify)
        //      the Context is lost, so we need a different way to persist this state
        localStorage.setItem('fromService', fromService);
        localStorage.setItem('toService', toService);

        navigate('/fromServiceSelection');
    };


    return (
        <div className="streaming-service-page" id={id} {...rest}>
            <div className="title">
                <h1>Streaming Service Selection</h1>
            </div>

            <div className="button-column-container">
                <div className="button-column">
                    <h2>From:</h2>
                    {/* TODO: set clicked state based on context */}
                    <StreamingServiceButtons serviceCallback={fromCallBack} />
                </div>
                <div className="button-column">
                    <h2>To:</h2>
                    <StreamingServiceButtons serviceCallback={toCallBack} />
                </div>
            </div>

            <div className="text-block">
                <p>Swapping music from {fromService !== "" ? fromService : EMPTY} to {toService !== "" ? toService : EMPTY}</p>
                <button
                    className={`rainbow-button ${shouldShowSummonSwapButton() ? '' : 'hide'}`}
                    onClick={() => setShowConfirmServicesModal(true)}
                >
                    Summon Swapping Sequence!
                </button>
                {showConfirmServicesModal && (
                    <ConfirmServicesModal
                        onContinue={handleModalContinue}
                        onCancel={() => setShowConfirmServicesModal(false)}
                    />
                )}
            </div>
        </div>
    );

}

export default ServiceSelectionPage;
