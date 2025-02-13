import { useEffect, useRef, useState } from "react"
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
    const [isLoading, setIsLoading] = useState(false);
    let todoAppRef = useRef<TodoApp>(new TodoApp());

    useEffect(() => {
        setIsLoading(true)
        const td = todoAppRef.current;

        const id = setTimeout(action(() => {

            td.todoLists = parseJson(localStorage.getItem("todoLists") ?? "[]");
            td._listNextId = Number(localStorage.getItem("nextListId"));

            autorun(() => localStorage.setItem("todoLists", JSON.stringify(td.todoLists)));
            autorun(() => localStorage.setItem("nextListId", String(td._listNextId)));

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
            <TodoMain />
            {isLoading && <div className="text-indigo-400
            py-4 px-6 font-bold">
                Loading...
            </div>}
        </TodoContext.Provider>
    )
}