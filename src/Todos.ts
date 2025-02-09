import { makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

export class Todo {
    id: number
    text: string
    done: boolean

    static nextId: number = 0;

    constructor(text: string, list: TodoList) {
        makeAutoObservable(this, {
            id: false
        })
        this.id = list._todoNextId++;
        this.done = false;
        this.text = text;
    }
}



export type TodoListColor = "red" | "green" | "blue" | "yellow" | "pink" | "default";



export class TodoList {
    id: number
    pinned: boolean
    text: string
    color?: TodoListColor
    todos: Todo[]
    labels: string[]

    _todoNextId: number = 0

    constructor(text: string, app: TodoApp) {
        makeAutoObservable(this, {
            id: false
        })
        this.id = app._listNextId++;
        this.pinned = false;
        this.color = "default";
        this.todos = [];
        this.labels = [];
        this.text = text;
    }

    deleteTodo(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }
}



export class TodoApp {
    todoLists: TodoList[]

    _listNextId: number = 0

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
        const labels = new Map<string, number>();

        this.todoLists.forEach(list => list.labels.forEach(label => {
            if (!labels.has(label))
                labels.set(label, 1);
            else labels.set(label, labels.get(label)! + 1)
        }))

        return labels;
    }

    deleteTodoList(list: TodoList) {
        this.todoLists.splice(this.todoLists.indexOf(list), 1);
    }

    deleteTodo(todo: Todo) {
        for (const list of this.todoLists) {
            const i = list.todos.indexOf(todo);
            if (i != -1) {
                list.todos.splice(i, 1);
                return;
            }
        }
    }
}



export const TodoContext = createContext<TodoApp>(new TodoApp());

export function useTodoApp() {
    return useContext(TodoContext);
}