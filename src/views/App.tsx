import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import Routes from 'Routes';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import Provider from 'context/Provider';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return (
        <ErrorBoundary>
            <GlobalStyles styles={{ html: { fontFamily: 'Goudy Old Style' }, body: { margin: 0 } }} />
            <Provider>
                <CssBaseline />
                <Box minHeight="100vh" display="flex" flexDirection="column">
                    <Navbar />
                    <Box sx={{ flexGrow: 1 }}>
                        <Router basename="/">
                            <Suspense fallback={<div>Loading....</div>} />
                            <Routes />
                        </Router>
                    </Box>
                    <Footer />
                </Box>
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
