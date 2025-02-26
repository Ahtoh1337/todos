import { useEffect, useRef } from "react"
import { TodoApp, TodoContext, TodoList } from "./Todos";
import { action, autorun } from "mobx";
import { Header } from "./Header";
import { TodoMain } from "./TodoMain";

function parseJson(str: string): TodoList[] {
    try {
        return JSON.parse(str);
    }
    catch {
        return [];
    }
}

export default function App() {
    let todoAppRef = useRef<TodoApp>(new TodoApp());

    useEffect(action(() => {
        const td = todoAppRef.current;

        td.todoLists = parseJson(localStorage.getItem("todoLists") ?? "[]");
        td._listNextId = Number(localStorage.getItem("nextListId"));

        autorun(() => localStorage.setItem("todoLists", JSON.stringify(td.todoLists)));
        autorun(() => localStorage.setItem("nextListId", String(td._listNextId)));
    }), []);

    return (
        <TodoContext.Provider value={todoAppRef.current}>
            <Header />
            <TodoMain />
        </TodoContext.Provider>
    )
}