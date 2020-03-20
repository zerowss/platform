import fetch from '@api/request';

export interface UserLoginData {
    tel: string;
    password: string;
}

export function getSalt() {
    return fetch().get('/api/refreshsalt')
}

export function login(data: UserLoginData) {
    return fetch().get('/api/login', { params: data })
}
