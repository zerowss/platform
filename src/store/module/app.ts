import { Dispatch } from 'redux';
/*
 * @Author: your name
 * @Date: 2020-03-29 11:50:40
 * @LastEditTime: 2020-03-30 09:59:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/store/module/app.ts
 */
import { Reducer } from 'redux';
import { IAction } from '../types';
import LocalStore from '@utils/storage';
import { getUserRoutesApi } from '../api';

// 定义接口
import { GAppState, GPages } from '@typings/app';
import { message } from 'antd';

// Type
const APP_ACTIVE = 'APP_ACTIVE';
const SET_APP_ACTIVE = 'SET_APP_ACTIVE';
const SET_OPENLIST = 'SET_OPENLIST';
const REMOVE_OPENLIST = 'REMOVE_OPENLIST';
const GET_USER_ROUTES = 'GET_USER_ROUTES';

// action
const localAppInfo = LocalStore.getValue<GAppState>(APP_ACTIVE) || {};
const defaultAppInfo: GAppState = {
    activeNav: {
        id: 1,
        title: '首页',
        breadceumb: ['首页'],
        path: '/index'
    },
    opendPagesList: {},
    userRoutes: [],
    ...localAppInfo
};

export const setAppActive: (activeNav: GPages) => IAction<any> = (activeNav: GPages) => ({
    type: SET_APP_ACTIVE,
    payload: {
        activeNav: activeNav
    },
});

export const setAppOpendPage: (opendpages: GPages) => IAction<GPages> = (opendpages: GPages) => ({
    type: SET_OPENLIST,
    payload: opendpages,
});

export const delAppOpendPage: (opendpages: GPages) => IAction<GPages> = (opendpages: GPages) => ({
    type: REMOVE_OPENLIST,
    payload: opendpages,
});

//  获取路由
export const getUserRoutes: (routes: GPages[]) => IAction<any> = (routes: GPages[]) => ({
    type: GET_USER_ROUTES,
    payload: { userRoutes: routes },
});

export const getUserRoutesAsync = () => (dispatch: Dispatch) => {
    console.log('更新路由');
    getUserRoutesApi().then(res => {
        dispatch(getUserRoutes(res.data.data))
    }).catch(error=>{
        message.error(error.msg);
    })
}

// reducers
const appReducer: Reducer<GAppState, IAction<any>> = (
    state = defaultAppInfo,
    action: IAction<any>
) => {
    const { type, payload } = action;
    let defState;
    switch (type) {
        case SET_APP_ACTIVE:
            defState = {
                ...state,
                ...payload,
            };
            LocalStore.setValue(APP_ACTIVE, defState);
            return defState
        case SET_OPENLIST:
            defState = {
                ...state,
                ...payload,
            };
            LocalStore.setValue(APP_ACTIVE, defState);
            return defState;
        case REMOVE_OPENLIST:
            state.opendPagesList = {};
            LocalStore.removeValue(APP_ACTIVE);
            return state;
        case GET_USER_ROUTES:
            defState = {
                ...state,
                ...payload,
            };
            LocalStore.setValue(APP_ACTIVE, defState);
            return defState;
        default:
            return state
    }
}
export default appReducer;
