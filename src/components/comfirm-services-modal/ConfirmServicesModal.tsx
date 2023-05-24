import "./ConfirmServicesModal.css";

type ConfirmServicesModalProps = {
    from: string;
    to: string;
    onContinue: () => void;
    onCancel: () => void;
  };

/**
 * Informative modal to display once the user has selected two streaming services and tries initiating the swap.
 * User can either cancel or continue (navigate to FromPage.tsx).
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
            To perform this swap, you will need to grant access to your {from} and {to} accounts.
            <br />
            <br />
            We only ask for the minimum required access to your data, and will never save or sell any of it.
        </div>
        <div className="dialog-box-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    );
  };
export default ConfirmServicesModal;