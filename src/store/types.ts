import { TodoListState } from './module/todolist';
import { UserState } from './module/user';

export interface IStoreState {
    todos: TodoListState[];
    user: UserState;
}

export interface IAction<T> {
    type: string;
    payload: T;
}
