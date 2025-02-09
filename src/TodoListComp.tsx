import { observer } from "mobx-react-lite";
import { TodoList, useTodoApp } from "./Todos";
import { action } from "mobx";
import { TodoComp } from "./TodoComp";
import { LabelComp } from "./LabelComp";

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
                <li className="@container">
                    <input
                        className="@w-max"
                        placeholder="Add todo..."
                        defaultValue=""
                        onBlur={(e) => {
                            todoApp.addTodo(e.target.value, todoList);
                            e.target.value = "";
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter")
                                e.currentTarget.blur();
                        }}
                        maxLength={40}
                    />
                </li>
            </ul>
            <ul>
                {todoList.labels.map((l, i) => (
                    <LabelComp key={l}
                        label={l}
                        onDelete={() => todoApp.deleteLabel(i, todoList)}
                        onBlur={(text) => todoApp.updateLabel(text, i, todoList)}
                        placeholder="Label..." />
                ))}
                <LabelComp
                    label=""
                    onBlur={(text) => todoApp.addLabel(text, todoList)}
                    placeholder="Add label..." />
            </ul>
        </div>
    )
})