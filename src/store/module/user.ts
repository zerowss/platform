import { Reducer } from 'redux';
import { IAction } from '../types';
import LocalStore from '@utils/storage';
// 定义接口
import { UserState } from '@typings/userInfo';

// Type
const USER_KEY = 'userInfo';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_USER_OUT = 'SET_USER_OUT';

// action
const localUserInfo = LocalStore.getValue<UserState>(USER_KEY) || {};
const defaultUser: UserState = {
    id: 0,
    tel: '',
    name: '',
    created_at: '',
    updated_at: '',
    source: 0,
    ...localUserInfo
};

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
    type: SET_USER_INFO,
    payload: user,
});

export const userout: () => IAction<null> = () => ({
    type: SET_USER_OUT,
    payload: null,
})

// reducers
const userReducer: Reducer<UserState, IAction<any>> = (
    state = defaultUser,
    action: IAction<any>
) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_INFO:
            LocalStore.setValue(USER_KEY, payload);
            return {
                ...payload,
            };
        case 'REMOVE_TOKEN':
            LocalStore.removeValue(USER_KEY);
            return {
                ...defaultUser,
            };
        default:
            return state
    }
}

export default userReducer;
