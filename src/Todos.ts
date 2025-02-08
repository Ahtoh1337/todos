import { computed, makeAutoObservable, observable } from "mobx"
import { createContext, useContext } from "react"

export interface Todo {
    id: number
    text: string
    completed: boolean
    term?: Date
}

export type TodoListColor = "red" | "green" | "blue" | "yellow" | "pink" | "gray";

export interface Label {
    test: string
}

export interface TodoList {
    id: number
    pinned: boolean
    text: string
    color?: TodoListColor
    todos: Todo[],
    labels: Label[]
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
            getLabels: computed
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

    get getLabels() {
        const labels = new Map<Label, number>();

        this.todoLists.forEach(list => list.labels.forEach(label => {
            if (!labels.has(label))
                labels.set(label, 1);
            else labels.set(label, labels.get(label)! + 1)
        }))

        return labels;
    }
}

export const TodoContext = createContext<TodoApp>(new TodoApp());

export function useTodos() {
    return useContext(TodoContext);
}