import fetch from '@api/request';

export interface ResponsePowerApi {
    id: number;
    name: string;
    slug: string;
    http_path: string;
    http_method:string;
    created_at: string;
    update_at: string;
}

export interface RequestPowerParams{
    page: number;
    per_page: number;
}

export function getListApi(data: RequestPowerParams) {
    return fetch().get('/api/admin-api/admin-permissions',{params: data})
}

interface PostForm {
    params?: any;
    id?: number
}

export function powerApi(method: 'get'|'post' | 'patch' | 'delete', ob: PostForm) {
    
    switch (method) {
        case 'get':
            return fetch().get('/api/admin-api/admin-permissions', { params: ob.params })
            break;
        case 'post':
            return fetch().post('/api/admin-api/admin-permissions', ob.params)
            break;
        case 'patch':
            return fetch().patch('/api/admin-api/admin-permissions/' + ob.id, ob.params)
            break;
        case 'delete':
            return fetch().delete('/api/admin-api/admin-permissions/' + ob.id)
            break;        
        default:
            break;
    }
}
