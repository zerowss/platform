/*
 * @Author: your name
 * @Date: 2020-03-11 18:06:41
 * @LastEditTime: 2020-03-29 12:05:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/store/index.ts
 */
import { createStore, combineReducers, applyMiddleware, compose, Middleware, Reducer } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { IStoreState, IAction } from './types';

import todosReducer from './module/todolist';
import userReducer from './module/user';
import appReducer from './module/app';

const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
    todos: todosReducer,
    user: userReducer,
    app: appReducer
});

const middleware: Middleware[] = [reduxThunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(reduxLogger);
}

function createMyStore() {
    /* eslint-disable no-underscore-dangle */
    const store = window.__REDUX_DEVTOOLS_EXTENSION__
        ? createStore(
            reducers,
            compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})),
        )
        : createStore(reducers, applyMiddleware(...middleware));

    return store;
}

const store = createMyStore();

export default store;
