import { observer } from "mobx-react-lite";
import { TodoList } from "./Todos";
import { TodoListComp } from "./TodoListComp";

export const TodoLists = observer(function ({ lists }: { lists: TodoList[] }) {
    return (
        <div className="
        grid items-baseline gap-y-4
        gap-x-2 lg:gap-x-3
        grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
            {lists.map(l => (<TodoListComp key={l.id} todoList={l} />))}
        </div>
    )
})