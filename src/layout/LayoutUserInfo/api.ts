import fetch from '@api/request';


export function userOutApi() {
    return fetch().get('/api/admin-api/logout')
}
