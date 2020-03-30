/*
 * @Author: your name
 * @Date: 2020-03-13 15:23:16
 * @LastEditTime: 2020-03-29 12:04:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/store/types.ts
 */
import { TodoListState } from './module/todolist';
import { UserState } from '@typings/userInfo';
import { GAppState } from '@typings/app';
export interface IStoreState {
    todos: TodoListState[];
    user: UserState;
    app: GAppState
}

export interface IAction<T> {
    type: string;
    payload: T;
}
