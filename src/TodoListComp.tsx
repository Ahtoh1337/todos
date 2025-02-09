import { observer } from "mobx-react-lite";
import { Todo, TodoList, useTodoApp } from "./Todos";
import { action } from "mobx";
import { TodoComp } from "./TodoComp";

export const TodoListComp = observer(function ({ todoList }: { todoList: TodoList }) {
    const color = todoList.color ? `bg-${todoList.color}-700` : "";
    const todoApp = useTodoApp();
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
                <button className="px-2 hover:bg-blue-900" onClick={() => todoApp.deleteTodoList(todoList)}>
                    Delete
                </button>
            </div>
            <ul>
                {todoList.todos.map((t => (
                    <TodoComp key={t.id} todo={t} />
                )))}
                <li>
                    <button
                        onClick={action(() => todoList.todos.push(new Todo("New todo", todoList)))}
                        className="px-2 hover:bg-blue-900">
                        Add new todo...
                    </button>
                </li>
            </ul>
            <ul>
                {todoList.labels.map((l, i) => (
                    <LabelComp key={l}
                        label={l}
                        onDelete={action(() => todoList.labels.splice(i, 1))}
                        onBlur={action((text) => {
                            if (todoList.labels.filter(label => label === text).length > 1)
                                todoList.labels.splice(i, 1);
                            else todoList.labels[i] = text;
                        })} />
                ))}
                <li className="inline border-l-2 px-1 border-l-gray-400 text-sm hover:bg-gray-600">
                    <button
                    onClick={action(() => {
                        let count = 1;
                        while(true) {
                            const name = `label ${count++}`;
                            if (!todoList.labels.includes(name)) {
                                todoList.labels.push(name);
                                break;
                            }
                        }
                    })}>
                        +
                    </button>
                </li>
            </ul>
        </div>
    )
})

function LabelComp({ label, onBlur, onDelete }: { label: string, onBlur: (text: string) => void, onDelete: () => void }) {
    return (
        <li className="inline border-l-2 px-1 border-l-gray-400 text-sm">
            <input className="w-16" defaultValue={label} onBlur={e => { onBlur(e.target.value) }} />
            <button
                className="bg-red-900 hover:bg-red-700 px-1"
                onClick={() => onDelete()}>
                X
            </button>
        </li>
    )
}