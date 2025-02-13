import { observer } from "mobx-react-lite";
import { TodoList, useTodoApp } from "./Todos";
import { action } from "mobx";
import { TodoComp } from "./TodoComp";
import { LabelComp } from "./LabelComp";
import { useRef } from "react";
import ConfirmButton from "./ConfirmButton";

export const TodoListComp = observer(function ({ todoList }: { todoList: TodoList }) {
    const todoApp = useTodoApp();

    const maxl = 15;
    const shortText = todoList.text.length > maxl ?
        todoList.text.substring(0, maxl - 3) + "..." :
        todoList.text;

    let addTodoRef = useRef<HTMLInputElement>(null);
    return (
        <div className={`bg-indigo-200 px-3 py-2 rounded-lg drop-shadow-sm
            ${todoList.pinned ? "bg-linear-to-b from-indigo-300/80" : ""}`}>
            <div className="flex justify-between mb-1">
                <button
                    className={`w-7 h-7 rounded-full
                        hover:bg-indigo-300 active:bg-indigo-400
                        ${todoList.pinned ? "outline-2 -outline-offset-2 outline-dashed outline-indigo-400" : ""}`}
                    onClick={action(() => todoList.pinned = !todoList.pinned)}>
                    📌
                </button>
                <ConfirmButton
                    className="w-7 h-7 rounded-full
                    hover:bg-indigo-300 active:bg-indigo-400
                    disabled:hidden"
                    onConfirm={() => todoApp.deleteTodoList(todoList)}
                    confirmText={`Delete ${shortText}?`}
                    disabled={todoList.pinned}>
                    🗑
                </ConfirmButton>
            </div>
            <h2>
                <input
                    className="outline-none border-b-3
                    border-indigo-300
                    w-full font-bold text-lg
                    placeholder:text-indigo-300"
                    placeholder="Todo List..."
                    defaultValue={todoList.text}
                    maxLength={40}
                    onBlur={action(e => {
                        const value = e.target.value.trim()
                        todoList.text = value;
                        e.target.value = value;
                    })}
                    onKeyDown={e => {
                        if (e.key === "Enter")
                            e.currentTarget.blur();
                    }}
                />
            </h2>
            <div className="flex flex-col min-h-49 justify-between">
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
        </div>
    )
})