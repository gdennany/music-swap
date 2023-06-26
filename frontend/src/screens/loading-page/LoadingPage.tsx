import "./LoadingPage.css";

/**
 * Loading page to show while fetching/posting data from APIs. Says "Loading..." and shows the dog image with a pulsing animation. 
 */
const LoadingPage: React.FC = () => {
    return (
        <div className="loading-page">
            <div className="loading-text">
                Loading... {"\u{1F633}"}
            </div>
            <div className="spinning-container">
                <img src="/Dog.JPG" alt="Loading..." className="loading-image" />
            </div>
        </div>
    );
};

export default LoadingPage;