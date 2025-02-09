import { observer } from "mobx-react-lite";
import { TodoList } from "./Todos";
import { TodoListComp } from "./TodoListComp";

export const TodoLists = observer(function ({ lists }: { lists: TodoList[] }) {
    return (
        <div className="@container grid grid-cols-3 gap-2 bg-gray-700">
            {lists.map(l => (<TodoListComp key={l.id} todoList={l} />))}
        </div>
    )
})