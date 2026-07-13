import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here (e.g., Sentry)
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-on-background p-4">
          <div className="bg-surface-container max-w-lg w-full p-8 rounded-2xl border border-outline shadow-xl flex flex-col items-center text-center animate-in zoom-in duration-300">
            <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
            <h1 className="text-headline-md font-bold text-error mb-2">Something went wrong.</h1>
            <p className="text-on-surface-variant mb-6">
              The application encountered an unexpected error. Please refresh the page or try again later.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Reload Application
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-surface-container-highest rounded-lg w-full text-left overflow-auto max-h-48 border border-outline-variant">
                <p className="font-mono text-xs text-error font-bold mb-1">{this.state.error.toString()}</p>
                <pre className="font-mono text-[10px] text-on-surface-variant whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
