/*
 * @Author: your name
 * @Date: 2020-03-13 15:23:16
 * @LastEditTime: 2020-03-20 17:01:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/store/types.ts
 */
import { TodoListState } from './module/todolist';
import { UserState } from '@typings/userInfo';

export interface IStoreState {
    todos: TodoListState[];
    user: UserState;
}

export interface IAction<T> {
    type: string;
    payload: T;
}
