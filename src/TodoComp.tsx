import { observer } from "mobx-react-lite";
import { Todo, useTodoApp } from "./Todos";
import { action } from "mobx";

export const TodoComp = observer(function ({ todo }: { todo: Todo }) {
    const todoApp = useTodoApp();
    return (
        <li className="text-sm border-b-2 border-dotted border-indigo-300
        flex
        justify-start items-center">
            <button
                className="outline-2 outline-indigo-300 rounded-sm w-4 h-4 flex-none
                hover:bg-indigo-300 active:bg-indigo-400 mr-1
                text-xs"
                onClick={action(() => todo.done = !todo.done)}>
                {todo.done ? "✔️" : ""}
            </button>
            <input
                type="text"
                className={`outline-none py-1.5 px-1 flex-1
                ${todo.done ? "line-through decoration-2" : ""}`}
                defaultValue={todo.text}
                placeholder="Todo text..."
                onBlur={e => {
                    if (!todoApp.updateTodo(e.target.value, todo))
                        e.target.value = todo.text;
                }}
                onKeyDown={e => {
                    if (e.key === "Enter")
                        e.currentTarget.blur();
                }}
                maxLength={40} />
            <button
            className="rounded-sm w-4.5 h-4.5
            hover:bg-indigo-300 active:bg-indigo-400
            flex-none mr-1 text-xs"
                onClick={() => todoApp.deleteTodo(todo)}>
                ✖️
            </button>
        </li>
    )
})