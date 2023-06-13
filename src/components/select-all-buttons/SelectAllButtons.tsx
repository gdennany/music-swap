import React from 'react';

import './SelectAllButtons.css';

type SelectAllButtonsProps = {
    onSelectAllClick: () => void;
    onUnselectAllClick: () => void;
};

const SelectAllButtons: React.FC<SelectAllButtonsProps> = ({ onSelectAllClick, onUnselectAllClick }) => {
    return (
        <div className="select-all">
            <div className="select-all-container">
                <button onClick={onSelectAllClick} className="select-all-button">
                    Select all &#x2193;
                </button>
            </div>
            <div className="select-all-container">
                <button onClick={onUnselectAllClick} className="select-all-button">
                    Unselect all &#x2193;
                </button>
            </div>
        </div>
    );
};

export default SelectAllButtons;