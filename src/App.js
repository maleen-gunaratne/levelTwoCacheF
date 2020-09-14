import React from 'react';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import {Router} from 'react-router-dom';
import Routes from './Routes';
import history from './history';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Routes/>
            </Router>
        </ThemeProvider>
    );
}

export default App;
