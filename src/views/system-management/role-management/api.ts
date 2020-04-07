import fetch from '@api/request';

export interface ResponseInitApi {
    id: number;
    name: string;
    status: string;
    created_at: string;
    update_at: string;
}

export interface RequestInitParams{
    page?: number;
    per_page?: number;
}

interface PostForm {
    params?: RequestInitParams;
    id?: number
}

type TMethod = 'get' | 'post' | 'patch' | 'delete';
const URL = '/api/admin-api/admin-roles';

export function initApi(method: TMethod , ob: PostForm) {
    
    switch (method) {
        case 'get':
            return fetch().get(URL, { params: ob.params })
            break;
        case 'post':
            return fetch().post(URL, ob.params)
            break;
        case 'patch':
            return fetch().patch(URL + ob.id, ob.params)
            break;
        default :
            return fetch().delete(URL + ob.id)
            break;        
    }
}
