export function LabelComp({ label, onBlur, onDelete, placeholder }:
    {
        label: string,
        onBlur: (text: string) => boolean,
        onDelete?: () => void,
        placeholder: string
    }) {
    return (
        <li className="text-xs font-bold py-1 sm:py-0
        bg-indigo-300 text-indigo-100 pl-2 pr-1 m-0.5 rounded-full
        flex w-23 flex-auto items-center">
            <input
                className="py-1 w-full outline-none placeholder:text-indigo-200"
                placeholder={placeholder}
                maxLength={10}
                defaultValue={label}
                onBlur={e => {
                    const result = onBlur(e.target.value)
                    if (typeof onDelete === "undefined") {
                        e.target.value = "";
                        return
                    }
                    if (!result) e.target.value = label;

                }}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        e.currentTarget.blur();
                        
                    }
                }} />
            {typeof onDelete !== "undefined" ?
                <button
                    className="flex-none h-3.5 w-3.5 rounded-full
                    hover:bg-indigo-400
                    active:bg-indigo-500 active:text-indigo-300"
                    onClick={() => onDelete()}>
                    X
                </button>
                :
                <span className="text-indigo-300">X</span>
            }
        </li>
    )
}