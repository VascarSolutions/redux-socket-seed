import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger'
import rootReducer from './../reducers/rootReducer';


export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger) );

    return store;
}
