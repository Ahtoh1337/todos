import { computed, IReactionDisposer, makeAutoObservable, observable } from "mobx"
import { createContext, useContext } from "react"

export interface Todo {
    id: number
    title: string
    details: string
    completed: boolean
    term?: Date
    created: Date
}

export type TodoListColor = "red" | "green" | "blue" | "yellow";

export interface TodoList {
    id: number
    title: string
    color?: TodoListColor
    todos: Todo[]
}

export class TodoApp {
    todoLists: TodoList[]
    userName: string
    darkTheme: boolean

    disposers: IReactionDisposer[]

    constructor(todoLists: TodoList[] = [], userName: string = '', darkTheme: boolean = false) {
        makeAutoObservable(this, {
            todoLists: observable,
            countLists: computed,
            countTodos: computed,
            userName: observable,
            darkTheme: observable,
        })
        this.todoLists = todoLists;
        this.userName = userName;
        this.darkTheme = darkTheme;

        this.disposers = [];
    }

    get countLists() {
        return this.todoLists.length;
    }

    get countTodos() {
        return this.todoLists.reduce<number>((acc, list) => acc + list.todos.length, 0);
    }

    dispose() {
        this.disposers.forEach(d => d())
    }
}

export const TodoContext = createContext<TodoApp>(new TodoApp());

export function useTodos() {
    return useContext(TodoContext);
}