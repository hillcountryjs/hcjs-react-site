import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import Store from "./store";

const StoreInstance = Store();

ReactDOM.render(
    <Provider store={StoreInstance}>
        <Router>
            <Route path="/" component={App}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
