import fetch from '@api/request';

export interface UserLoginData {
    tel: string;
    password: string;
}

export function getSaltApi() {
    return fetch().get('/api/admin-api/refreshsalt')
}

export function getTokenApi(data: UserLoginData) {
    return fetch().post('/api/admin-api/login', data )
}

export function loginApi(data: UserLoginData) {
    return fetch().get('/api/admin-api/user', { params: data})
}
