import React, { ChangeEvent } from 'react';

import './SelectAll.css';

type SelectAllProps = {
    label: string;
    onChecked: (checked: boolean) => void;
};

const SelectAll: React.FC<SelectAllProps> = ({ label, onChecked }) => {

    const handleSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChecked(event.target.checked);
    };

    return (
        <div className="select-all-container">
            <input type="checkbox" onChange={handleSelectAllChange} className="select-all-input" />
            <label className="select-all-label">{label}</label>
        </div>
    );
};

export default SelectAll;