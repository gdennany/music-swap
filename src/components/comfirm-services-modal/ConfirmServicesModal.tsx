import "./ConfirmServicesModal.css"

type ConfirmServicesModalProps = {
    from: string;
    to: string;
    onContinue: () => void;
    onCancel: () => void;
  };

/**
 * Informative confirm continue modal to display once the user has selected two streaming services, and tries initiating the swap.
 */
const ConfirmServicesModal: React.FC<ConfirmServicesModalProps> = ({
    from,
    to,
    onContinue,
    onCancel,
  }) => {
    return (
      <div className="dialog-box">
        <div className="dialog-box-message">
            To retrieve data from {from} and to save to {to}, you must grant this website permission to both. Essentially, to complete this music data swap, you will
            need to log in to both accounts when prompted.
            <br />
            <br />
            We only ask for the minimum required access to your data, and will never save/sell any of it.
        </div>
        <div className="dialog-box-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    );
  };
export default ConfirmServicesModal;