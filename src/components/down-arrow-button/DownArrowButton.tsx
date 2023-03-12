import { useState } from "react";

import "./DownArrowButton.css";

export function DownArrowButton() {
    const [hovered, setHovered] = useState(false);
    
    // const handleHover = () => {
    //     setHovered(true);
    //     console.log('hover')
    // };
    
    // const handleLeave = () => {
    //     setHovered(false);
    // };

    return (
        <div className="down-arrow-button-container">
            <img
                src="/DownArrow.png"
                alt="Down arrow"
                className="hover-image"
                // className={`hover-image ${hovered ? "hovered" : ""}`}
                // onMouseEnter={handleHover}
                // onMouseLeave={handleLeave}
            />
        </div>
    );
  }