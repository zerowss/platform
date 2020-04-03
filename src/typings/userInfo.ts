import { RouteConfigs } from "./menuRouter";

export interface UserState {
    id: number;
    tel?: string;
    username?: string;
    name?: string;
    avatar?: string;
    roles?: string[];
    permissions?: string[];
    status?: string;
    created_at?: string;
    updated_at?: string;
    user_routes: RouteConfigs[];
}
