import { makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

export class Todo {
    id: number
    text: string
    completed: boolean
    term?: Date

    #list: TodoList

    static #nextId: number = 0;

    constructor(text: string, list: TodoList) {
        makeAutoObservable(this, {
            id: false
        })
        this.id = Todo.#nextId++;
        this.completed = false;
        this.text = text;
        this.#list = list;
    }

    delete() {
        this.#list.todos = this.#list.todos.filter(t => !Object.is(t, this))
    }
}



export type TodoListColor = "red" | "green" | "blue" | "yellow" | "pink" | "default";



export interface Label {
    test: string
}



export class TodoList {
    id: number
    pinned: boolean
    text: string
    color?: TodoListColor
    todos: Todo[]
    labels: Label[]

    #app: TodoApp

    static #nextId: number = 0;

    constructor(text: string, app: TodoApp) {
        makeAutoObservable(this, {
            id: false
        })
        this.id = TodoList.#nextId++;
        this.pinned = false;
        this.color = "default";
        this.todos = [];
        this.labels = [];
        this.text = text;
        this.#app = app;
    }

    delete() {
        this.#app.todoLists = this.#app.todoLists.filter(l => !Object.is(this, l));
    }
}



export class TodoApp {
    todoLists: TodoList[]

    constructor(todoLists: TodoList[] = []) {
        makeAutoObservable(this);
        this.todoLists = todoLists;

    }

    get todoListCount() {
        return this.todoLists.length;
    }

    get todoCount() {
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