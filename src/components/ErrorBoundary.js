// General error boundary to catch other errors
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { errorBoundaryPropTypes } from '../propTypes';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      this.setState({ error, errorInfo });
      console.error('Error boundary caught an error', error, errorInfo);
    }
  
    handleReload = () => {
      this.setState({ hasError: false, error: null, errorInfo: null });
      window.location.reload();
    };
  
    render() {
      if (this.state.hasError) {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" color="error">Something went wrong.</Typography>
            <Typography variant="body1" color="error">{this.state.error?.toString()}</Typography>
            <Typography variant="body2" color="textSecondary">{this.state.errorInfo?.componentStack}</Typography>
            <Button variant="contained" color="primary" onClick={this.handleReload}>Reload</Button>
          </Box>
        );
      }
      return this.props.children;
    }
  }
  
  ErrorBoundary.propTypes = errorBoundaryPropTypes;
  
  export default ErrorBoundary;