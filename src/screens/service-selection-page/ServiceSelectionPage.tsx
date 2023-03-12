import { useState } from "react";
import "./ServiceSelectionPage.css";

interface ServiceSelectionPageProps extends React.HTMLAttributes<HTMLDivElement> {}
  
const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ id, ...rest }) => {
    return  (
    <div className="container" id={id} {...rest}>
        <h1>Streaming Services</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>Column 1</h2>
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                <button>Button 4</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>Column 2</h2>
                <button>Button 5</button>
                <button>Button 6</button>
                <button>Button 7</button>
                <button>Button 8</button>
            </div>
        </div>
      </div>
    )
    
}

export default ServiceSelectionPage;
