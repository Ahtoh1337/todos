import { observer } from "mobx-react-lite";
import { TodoList, useTodoApp } from "./Todos";
import { action } from "mobx";
import { TodoComp } from "./TodoComp";
import { LabelComp } from "./LabelComp";
import { useRef } from "react";

export const TodoListComp = observer(function ({ todoList }: { todoList: TodoList }) {
    const todoApp = useTodoApp();

    let addTodoRef = useRef<HTMLInputElement>(null);
    return (
        <div className="bg-indigo-200 px-3 py-2 rounded-lg drop-shadow-sm">
            <div className="flex justify-between mb-1">
                <button
                    className={`w-7 h-7 rounded-full hover:bg-indigo-300 active:bg-indigo-400 ${todoList.pinned ? "outline-2 outline-dashed outline-indigo-400" : ""}`}
                    onClick={action(() => todoList.pinned = !todoList.pinned)}>
                    📌
                </button>
                <button
                    className="w-7 h-7 rounded-full hover:bg-indigo-300 active:bg-indigo-400"
                    onClick={() => todoApp.deleteTodoList(todoList)}>
                    🗑
                </button>
            </div>
            <h2>
                <input
                    className="outline-none border-b-3
                    border-indigo-300
                    w-full font-bold text-lg
                    placeholder:text-indigo-300"
                    placeholder="Todo List..."
                    defaultValue={todoList.text}
                    onBlur={action(e => todoList.text = e.target.value)}
                />
            </h2>
            <ul>
                {todoList.todos.map((t => (
                    <TodoComp key={t.id} todo={t} />
                )))}
                <li className="text-sm ml-5">
                    <input
                        ref={addTodoRef}
                        className="py-1.5 pl-1 w-full outline-none"
                        placeholder="Add todo..."
                        defaultValue=""
                        onBlur={(e) => {
                            todoApp.addTodo(e.target.value, todoList);
                            e.target.value = "";
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter")
                                e.currentTarget.blur();
                                addTodoRef.current?.focus();
                        }}
                        maxLength={30}
                    />
                </li>
            </ul>
            <ul className="flex flex-wrap">
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