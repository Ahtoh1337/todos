import { computed, makeAutoObservable, observable } from "mobx"
import { createContext, useContext } from "react"

export interface Todo {
    id: number
    text: string
    completed: boolean
    term?: Date
}

export type TodoListColor = "red" | "green" | "blue" | "yellow" | "pink" | "gray";

export interface TodoList {
    id: number
    pinned: boolean
    text: string
    color?: TodoListColor
    todos: Todo[]
}

export class TodoApp {
    todoLists: TodoList[]
    darkTheme: boolean

    constructor(todoLists: TodoList[] = [], darkTheme: boolean = false) {
        makeAutoObservable(this, {
            todoLists: observable,
            countLists: computed,
            countTodos: computed,
            darkTheme: observable,
        })
        this.todoLists = todoLists;
        this.darkTheme = darkTheme;

    }

    get countLists() {
        return this.todoLists.length;
    }

    get countTodos() {
        return this.todoLists.reduce<number>((acc, list) => acc + list.todos.length, 0);
    }
}

export const TodoContext = createContext<TodoApp>(new TodoApp());

export function useTodos() {
    return useContext(TodoContext);
}