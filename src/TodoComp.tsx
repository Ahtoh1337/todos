import { observer } from "mobx-react-lite";
import { Todo, useTodoApp } from "./Todos";
import { action } from "mobx";

export const TodoComp = observer(function ({ todo }: { todo: Todo }) {
    const todoApp = useTodoApp();
    return (
        <li className="@container border-2 border-gray-400">
            <button
                className="px-2 hover:bg-blue-800"
                onClick={action(() => todo.done = !todo.done)}>
                {todo.done ? "V" : "X"}
            </button>
            ({todo.id}){" "}
            <input
                className={`@w-max ${todo.done ? "line-through" : ""}`}
                defaultValue={todo.text}
                onBlur={e => {
                    if (!todoApp.updateTodo(e.target.value, todo))
                        e.target.value = todo.text;
                }}
                onKeyDown={e => {
                    if (e.key === "Enter")
                        e.currentTarget.blur();
                }}
                maxLength={40} />
            <button className="px-2 hover:bg-blue-800"
                onClick={() => todoApp.deleteTodo(todo)}>
                Delete
            </button>
        </li>
    )
})