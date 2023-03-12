import { animateScroll as scroll, scroller } from 'react-scroll';

import "./DownArrowButton.css";

export function DownArrowButton() {

    const scrollToNextPage = () => {
        console.log('scroll')
        scroller.scrollTo('serviceSelectionPage', {
          duration: 1000,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
      }

    return (
        <div className="down-arrow-button-container">
            <img
                src="/DownArrow.png"
                alt="Down arrow"
                className="hover-image"
                onClick={scrollToNextPage}
            />
        </div>
    );
  }