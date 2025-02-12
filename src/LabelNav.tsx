import { observer } from "mobx-react-lite";
import { useTodoApp } from "./Todos";

export const LabelNav = observer(function ({ current, onSelect }: { current: string, onSelect: (label: string) => void }) {
    const todoApp = useTodoApp();

    return (
        <ul>
            <li className="w-full">
                <button
                    className={`w-full p-2 pr-5
                        font-bold rounded-r-full flex justify-between
                        ${current === "" ? "bg-indigo-400 text-indigo-50 drop-shadow-md" : "text-indigo-500 hover:bg-indigo-200 hover:text-indigo-600"}`}
                    onClick={() => onSelect("")}>
                    <span>All</span>
                    <span>{todoApp.todoListCount}</span>
                </button>
            </li>
            {Array.from(todoApp.getLabels).map(([label, count]) => (
                <li className="w-full">
                    <button
                        className={`w-full p-2 pr-5
                    font-bold rounded-r-full flex justify-between
                    ${current === label ? "bg-indigo-400 text-indigo-50 drop-shadow-md" : "text-indigo-500 hover:bg-indigo-200 hover:text-indigo-600"}`}
                        onClick={() => onSelect(label)}>
                        <span>{label}</span>
                        <span>{count}</span>
                    </button>
                </li>
            ))}
        </ul>
    )
})