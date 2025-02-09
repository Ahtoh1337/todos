export function LabelComp({ label, onBlur, onDelete, placeholder }:
    {
        label: string,
        onBlur: (text: string) => boolean,
        onDelete?: () => void,
        placeholder: string
    }) {
    return (
        <li className="inline border-l-2 px-1 border-l-gray-400 text-sm">
            <input
                placeholder={placeholder}
                maxLength={15}
                className="w-20"
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
                    if (e.key === "Enter")
                        e.currentTarget.blur();
                }} />
            {typeof onDelete !== "undefined" &&
                <button
                    className="bg-red-900 hover:bg-red-700 px-1"
                    onClick={() => onDelete()}>
                    X
                </button>
            }
        </li>
    )
}