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
        <div className={`bg-default-list-100 px-3 py-2 rounded-lg drop-shadow-sm
            transition-colors duration-300 sm:transition-none
            text-default-list-400 bg-linear-to-b
            ${todoList.pinned ? "from-default-list-200/60 to-default-list-50"
                : ""}`}>
            <div className="flex justify-between mb-1">
                <button
                    className={`w-10 h-10 sm:w-7 sm:h-7
                        text-lg rounded-full
                        transition-all sm:transition-none duration-300
                        active:bg-default-list-200
                        sm:hover:bg-default-list-200 sm:active:bg-default-list-300
                        ${todoList.pinned ? "outline-2 -outline-offset-2 outline-dotted outline-default-list-200" : ""}`}
                    onClick={action(() => todoList.pinned = !todoList.pinned)}>
                    📌
                </button>
                <ConfirmButton
                    className="w-10 h-10 sm:w-7 sm:h-7
                    text-lg rounded-full
                    active:bg-default-list-200
                    transition-colors sm:transition-none duration-300
                    sm:hover:bg-default-list-200 sm:active:bg-default-list-300
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
                    border-default-list-200
                    w-full font-bold text-lg
                    placeholder:text-default-list-200"
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
                            type="text"
                            ref={addTodoRef}
                            className="py-1.5 pl-1 w-full outline-none placeholder:text-default-list-300"
                            placeholder="Add todo..."
                            defaultValue=""
                            onBlur={(e) => {
                                todoApp.addTodo(e.target.value, todoList);
                                e.target.value = "";
                            }}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.currentTarget.blur();
                                }
                                    
                                addTodoRef.current?.focus();
                            }}
                            maxLength={40}
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