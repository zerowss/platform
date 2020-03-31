import fetch from '@api/request';

export interface UserLoginData {
    tel: string;
    password: string;
}

export function getListApi() {
    return fetch().get('/api/admin-api/vue-routers');
}


