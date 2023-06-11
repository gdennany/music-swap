import React, { ChangeEvent } from 'react';

import './SelectAll.css';

type SelectAllProps = {
    label: string;
    onChecked: () => void;
};

const SelectAll: React.FC<SelectAllProps> = ({ label, onChecked }) => {
    return (
        <div className="select-all-container">
            <button onClick={onChecked} className="select-all-button">
                {label}
            </button>
        </div>
    );
};

export default SelectAll;