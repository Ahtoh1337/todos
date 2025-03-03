export function LabelComp({ label, onBlur, onDelete, placeholder }:
    {
        label: string,
        onBlur: (text: string) => boolean,
        onDelete?: () => void,
        placeholder: string
    }) {
    return (
        <li className="text-xs font-bold
        bg-default-list-200 text-default-list-50 pl-2 pr-0 sm:pr-1
        m-0.5 rounded-full
        flex w-20 flex-auto items-center">
            <input
                tabIndex={-1}
                className="py-2 sm:py-1 w-full outline-none placeholder:text-default-list-100"
                placeholder={placeholder}
                maxLength={20}
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
                    className="flex-none rounded-full
                    h-full sm:h-4
                    w-8 sm:w-4
                    
                    text-base sm:text-xs
                    hover:bg-default-list-300
                    active:bg-default-list-300 active:text-default-list-200"
                    onClick={() => onDelete()}>
                    x
                </button>
                :
                <span className="nidden"></span>
            }
        </li>
    )
}