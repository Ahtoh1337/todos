import { observer } from "mobx-react-lite";
import { useTodoApp } from "./Todos";

export const LabelNav = observer(function ({ current, onSelect }: { current: string, onSelect: (label: string) => void }) {
    const todoApp = useTodoApp();

    return (
        <ul>
            <li
                className={!current ? "bold italic" : ""}>
                <button
                    onClick={() => onSelect("")}>
                    All ({todoApp.todoListCount})
                </button>
            </li>
            {Array.from(todoApp.getLabels).map(([label, count]) => (
                <li
                    key={label}
                    className={label === current ? "bold underline italic" : ""}>
                    <button onClick={() => onSelect(label)}>
                        {label} ({count})
                    </button>
                </li>
            ))}
        </ul>
    )
})