import { useEffect, useRef, useState } from "react"
import { TodoApp, TodoContext, TodoList } from "./Todos";
import { UserData } from "./UserData";
import { action, autorun } from "mobx";
import { Header } from "./Header";

function parseJson(str: string): TodoList[] {
    try {
        return JSON.parse(str);
    }
    catch {
        return [];
    }
}

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    let todoAppRef = useRef<TodoApp>(new TodoApp());

    useEffect(() => {
        setIsLoading(true)
        const td = todoAppRef.current;

        const id = setTimeout(action(() => {
            td.todoLists = parseJson(localStorage.getItem("todoLists") ?? "[]");
            autorun(() => localStorage.setItem("todoLists", JSON.stringify(td.todoLists)));
            setIsLoading(false)
        }), 1000);

        return () => {
            clearTimeout(id);
            setIsLoading(false);
        };
    }, []);

    return (
        <TodoContext.Provider value={todoAppRef.current}>
            <Header />
            <UserData />
            {isLoading && <div>Loading...</div>}
        </TodoContext.Provider>
    )
}