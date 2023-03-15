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
            You have selected to swap music from your {from} subscription to your {to} subscription.
            If you decide to continue, you will be prompted to log into your {from} account. After logging in, you will see all of your music data,
            and you can select which songs to swap over to your {to} account. 
            <br />
            <br />
            After selecting which songs to swap, you will be prompted to log into your {to} account, so that we can save your selections to your account.
            <br />
            <br />
            We only ask for the minimum required access to your data, and will never store your passwords or data past the swapping action.
        </div>
        <div className="dialog-box-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    );
  };
export default ConfirmServicesModal;