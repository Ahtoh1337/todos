import { observer } from "mobx-react-lite";
import { TodoList } from "./Todos";
import { action } from "mobx";

export const TodoListComp = observer(function ({ todoList }: { todoList: TodoList }) {
    const color = todoList.color ? `bg-${todoList.color}-700` : "";
    return (
        <div className={`@container border-b-2 border-gray-400 p-2 m-2 ${color}`}>
            <h2 className="text-xl bold">
                ({todoList.id}){" "}
                <input
                    className="border-b-2 border-gray-400 @w-max"
                    defaultValue={todoList.text}
                    onBlur={action(e => todoList.text = e.target.value)}
                />
            </h2>
            <div>
                <button className="px-2 hover:bg-blue-900" onClick={action(() => todoList.pinned = !todoList.pinned)}>
                    {todoList.pinned ? "Unpin" : "Pin"}
                </button>
                <button className="px-2 hover:bg-blue-900" onClick={() => todoList.delete()}>
                    Delete
                </button>
            </div>
            <ul>
                {todoList.todos.map((t => (
                    <li key={t.id}>{t.text}</li>
                )))}
            </ul>
        </div>
    )
})