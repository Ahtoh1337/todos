import { observer } from "mobx-react-lite";
import { useTodoApp } from "./Todos";

export const LabelNav = observer(function ({ current, onSelect }: { current: string, onSelect: (label: string) => void }) {
    const todoApp = useTodoApp();

    return (
        <ul className="relative">
            <div className="sticky top-20 max-h-[80vh] overflow-y-auto">
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
                {Array.from(todoApp.getLabels).sort((a, b) => {
                    const result = b[1] - a[1];
                    if (result === 0)
                        return a[0].toLowerCase().localeCompare(b[0])
                    return result;
                }).map(([label, count]) => (
                    <li className="w-full" key={label}>
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
            </div>
        </ul>
    )
})