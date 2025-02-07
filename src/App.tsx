import { useEffect, useRef, useState } from "react"
import { TodoApp, TodoContext, TodoList } from "./Todos";
import { UserData } from "./UserData";
import { action, autorun } from "mobx";

function parseBool(str: string | null | undefined): boolean {
    if (str && str.toLowerCase() === 'true')
        return true;
    return false;
}

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
        const id = setTimeout(action(() => {
            const td = todoAppRef.current;

            td.userName = localStorage.getItem("userName") ?? "User";
            td.darkTheme = parseBool(localStorage.getItem("darkTheme"));
            td.todoLists = parseJson(localStorage.getItem("todoLists") ?? "[]");

            todoAppRef.current.disposers = [
                autorun(() => localStorage.setItem("userName", td.userName)),
                autorun(() => localStorage.setItem("darkTheme", String(td.darkTheme))),
                autorun(() => localStorage.setItem("todoLists", JSON.stringify(td.todoLists)))
            ]

            setIsLoading(false)
        }), 1000);
        return () => {
            clearTimeout(id);
            setIsLoading(false);
        };
    }, []);

    return (
        <TodoContext.Provider value={todoAppRef.current}>
            <UserData />
            {isLoading && <div>Loading...</div>}
        </TodoContext.Provider>
    )
}