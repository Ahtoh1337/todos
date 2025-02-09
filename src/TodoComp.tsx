import { observer } from "mobx-react-lite";
import { Todo, useTodoApp } from "./Todos";
import { action } from "mobx";

export const TodoComp = observer(function ({ todo }: { todo: Todo }) {
    const todoApp = useTodoApp();
    return (
        <div className="@container border-2 border-gray-400">
            <button
                className="px-2 hover:bg-blue-800"
                onClick={action(() => todo.done = !todo.done)}>
                {todo.done ? "V" : "X"}
            </button>
            ({todo.id}){" "}
            <input
                className={`@w-max ${todo.done ? "line-through" : ""}`}
                defaultValue={todo.text}
                onBlur={action(e => todo.text = e.target.value)}
                maxLength={40} />
            <button className="px-2 hover:bg-blue-800"
                onClick={() => todoApp.deleteTodo(todo)}>
                Delete
            </button>
        </div>
    )
})