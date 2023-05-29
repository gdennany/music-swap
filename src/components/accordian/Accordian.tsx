import React, { useState } from "react";

import './Accordian.css';

type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

/**
 * Expandable and collapsable component. Will hold Songs/Albums/Playlists content on the MusicData page.
 */
const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-section">
            <button className={`accordion ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                {title}
            </button>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
};

export default Accordion;