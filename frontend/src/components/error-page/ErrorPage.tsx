import "./ErrorPage.css";

interface ErrorPageProps {
    errorDescription: string;
}

/**
 * Error page to display when something goes wrong.
 */
const ErrorPage: React.FC<ErrorPageProps> = ({ errorDescription }) => {
    return (
        <div className="error-page">
            <p className="error-title">{errorDescription}</p>
            <a href="/" className="back-home-link">Back to Home</a>
            <img src="/Dog.JPG" alt="Music Swap Logo" style={{ height: "80%", width: "46%" }} />
        </div>
    );
}

export default ErrorPage;
