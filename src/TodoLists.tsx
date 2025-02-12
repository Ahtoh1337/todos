import { observer } from "mobx-react-lite";
import { TodoList } from "./Todos";
import { TodoListComp } from "./TodoListComp";

export const TodoLists = observer(function ({ lists }: { lists: TodoList[] }) {
    return (
        <div className="
        grid items-baseline gap-y-4
        gap-x-2 lg:gap-x-3
        grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {lists.map(l => (<TodoListComp key={l.id} todoList={l} />))}
        </div>
    )
})