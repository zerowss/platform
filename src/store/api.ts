import fetch from '@api/request';


// 路由
export function getUserRoutesApi() {
    return fetch().get('/api/admin-api/configs/vue-routers')
}

