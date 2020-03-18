/*
 * @Author: your name
 * @Date: 2020-03-13 10:13:51
 * @LastEditTime: 2020-03-13 10:30:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/store/module/todolist.ts
 */
import { Reducer } from 'redux';
import { IAction } from '../types';

export interface TodoListState {
    id: number,
    text?: string,
    completed?: boolean
}
const defaultList: TodoListState[] = [];

 //Action
let nextTodoId:number = 0;
export const addTodo: (text: string) => IAction<TodoListState> = (text:string) => ({
    type: 'ADD_TODO',
    payload: {
        id: nextTodoId++,
        text,
        completed: false
    }
})

export const toggleTodo: (id: number) => IAction<TodoListState> = (id:number) => ({
    type: 'TOGGLE_TODO',
    payload: {
        id: id
    }
})

//reducers
const todosReducer: Reducer<TodoListState[], IAction<any>> = (state = defaultList, action: IAction<any>) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_TODO':
            return [
                ...state,
                payload
            ]
        case 'TOGGLE_TODO':
            return state.map((todo: TodoListState) =>
                todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
            )
        default:
            return state
    }
}

export default todosReducer;
