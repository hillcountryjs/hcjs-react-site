import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import Store from "./store";

const StoreInstance = Store();

ReactDOM.render(
    <Provider store={StoreInstance}>
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
