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

// 定义接口
import { GAppState, GPages } from '@typings/app';

// Type
const APP_ACTIVE = 'APP_ACTIVE';
const SET_APP_ACTIVE = 'SET_APP_ACTIVE';
const SET_OPENLIST = 'SET_OPENLIST';
const REMOVE_OPENLIST = 'REMOVE_OPENLIST';

// action
const localAppInfo = LocalStore.getValue<GAppState>(APP_ACTIVE) || {};
const defaultAppInfo: GAppState = {
    activeNav: {
        key: '1',
        meta:{
            title: '首页'
        },
        breadceumb: ['首页']
    },
    opendPagesList: {},
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
            LocalStore.setValue(APP_ACTIVE, state);
            return state;
        default:
            return state
    }
}
export default appReducer;
