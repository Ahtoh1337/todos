import { observer } from "mobx-react-lite";
import { TodoList, useTodos as useTodoApp } from "./Todos";
import { action } from "mobx";
import { TodoListComp } from "./TodoListComp";

export const UserData = observer(function () {
    const todoApp = useTodoApp();
    const bStyle = "py-1 px-2 mx-1 border-1 border-gray-400 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 rounded-sm";
    return (
        <>
            <button className={bStyle} onClick={action(() => todoApp.todoLists.unshift(new TodoList("New todo", todoApp)))}>Add Todo List</button>
            <button className={bStyle} onClick={action(() => todoApp.todoLists.splice(0, todoApp.todoListCount))}>Clear</button>

            <ol>
                {todoApp.todoLists.map(l => (
                    <TodoListComp key={l.id} todoList={l} />
                ))}
            </ol>

            <h2>{todoApp.todoListCount} lists</h2>
            <div className="text-gray-500">
                <pre>
                    {JSON.stringify(todoApp, null, 2)}
                </pre>
            </div>
        </>
    )
})