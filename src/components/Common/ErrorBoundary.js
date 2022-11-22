import React from "react";
import MainNavbar from "./MainNavbar";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: 'hello',
            errorInfo: 'mock text here'
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("Error caught by ErrorBoundary");
        this.setState({error: error.toString(), errorInfo: JSON.stringify(errorInfo)});
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="vh-100 dt w-100 bg-moon-gray">
                    <MainNavbar />
                    <div className={"pa5 bg-black white"}>
                        <h1>Ha ocurrido un error</h1>
                        <h3>pero estamos trabajando en ello :)</h3>
                        <code>{this.state.error}, </code>
                        <code>{this.state.errorInfo}</code>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

//from React docs: https://reactjs.org/docs/error-boundaries.html