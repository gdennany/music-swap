import React, { useContext, useState } from "react";

import './Accordian.css';
import { Context } from "../../Context";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
    onHeaderClicked: () => void;
};

/**
 * Expandable and collapsable component. Will hold Songs/Albums/Playlists content on the MusicData page.
 */
const Accordion: React.FC<AccordionProps> = ({ title, children, onHeaderClicked }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { playingAudio, setPlayingAudio } = useContext(Context);


    /**
     * Opens and Closes the Accordian section. Stops music if it is playing. Clears the search bar.
     */
    function headerClicked(): void {
        setIsOpen(!isOpen);
        playingAudio?.pause();
        setPlayingAudio(null);
        // callback to clear search term 
        onHeaderClicked();
    }

    return (
        <div className="accordion-section">
            <button className={`accordion ${isOpen ? "open" : ""}`} onClick={headerClicked}>
                {title}
            </button>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
};

export default Accordion;