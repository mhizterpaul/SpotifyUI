//think about the structure of each data you will be needing
//fetch data from api and initialize store 
//create store and other necessary action/reducers etc
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(
    reducers, 
    {},
    applyMiddleware(thunk)
    );