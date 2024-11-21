import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error_container}>
          <div className={styles.error_icon}>!</div>
          <p className={styles.error_message}>{this.state.error?.message || 'Something went wrong'}</p>
          <button onClick={this.handleRetry} className={styles.retry_button}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
