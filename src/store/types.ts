import { TodoListState } from './module/todolist';

export interface IStoreState {
    todos: TodoListState[];
}

export interface IAction<T> {
    type: string;
    payload: T;
}
