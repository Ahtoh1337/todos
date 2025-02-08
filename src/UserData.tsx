import { observer } from "mobx-react-lite";
import { useTodos } from "./Todos";
import { action } from "mobx";

export const UserData = observer(function() {
    const todoApp = useTodos();
    const bStyle = "py-1 px-2 mx-1 border-1 border-gray-400 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 rounded-sm";
    return (
        <>
            <button className={bStyle} onClick={action(() => todoApp.todoLists.push({
                id: todoApp.countLists,
                pinned: false,
                text: `Todo List #${todoApp.countLists}`,
                todos: [],
                labels: []
            }))}>Add Todo List</button>
            <button className={bStyle} onClick={action(() => todoApp.todoLists.splice(0, todoApp.countLists))}>Clear</button>

            <ol>
                {todoApp.todoLists.map(l => (
                    <li key={l.id}>{l.text} ({l.todos.length} todos)</li>
                ))}
            </ol>

            <h2>{todoApp.countLists} lists</h2>
        </>
    )
})