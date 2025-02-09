import { observer } from "mobx-react-lite";
import { Todo } from "./Todos";
import { action } from "mobx";

export const TodoComp = observer(function ({ todo }: { todo: Todo }) {
    return (
        <li className="@container">
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
            maxLength={40}/>
            <button className="px-2 hover:bg-blue-800"
            onClick={() => todo.delete()}>
                Delete
            </button>
        </li>
    )
})