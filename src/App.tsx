import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import AppBar from './components/appbar/AppBar';


class App extends Component {
    render() {
        return (
            <div>
                <AppBar />
            </div>
        );
    }
}

export default App;