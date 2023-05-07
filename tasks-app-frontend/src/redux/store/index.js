import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    todoReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
