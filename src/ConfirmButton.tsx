import { useEffect, useRef, useState } from "react"

export default function ConfirmButton({ children, className, confirmText, onConfirm, disabled }:
    {
        children: any
        className: string
        confirmText: string
        onConfirm: () => void
        disabled?: boolean
    }) {
    const [popup, setPopup] = useState(false);

    let popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (popup && !popupRef.current?.contains(e.target as Node)) {
                setPopup(false);
            }
        }

        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick);
    }, [popup])

    return (
        <div className="relative">
            <button
                disabled={disabled}
                className={className}
                onClick={(e) => {
                    setPopup(!popup)
                    e.stopPropagation();
                }}>
                {children}
            </button>
            {popup &&
                <div ref={popupRef}
                    className="absolute rounded-md p-2
                    bg-indigo-400 text-indigo-50
                    bg-linear-to-b from-indigo-600/50
                    font-bold
                    right-0 min-w-40 text-center
                    drop-shadow-md">
                    <p className="mb-2">
                        {confirmText}
                    </p>
                    <div className="flex justify-around items-center">
                        <button
                            className="py-3 sm:py-0 px-3.5 sm:px-2 rounded-full
                            bg-indigo-600
                            hover:bg-indigo-800 hover:text-indigo-100
                            hover:drop-shadow-sm"
                            onClick={() => {
                                onConfirm();
                                setPopup(false);
                            }}>
                            Yes
                        </button>
                        <button
                            className="py-3 sm:py-0 px-3.5 sm:px-2 rounded-full
                            bg-indigo-300
                            hover:bg-indigo-500 hover:text-indigo-100
                            hover:drop-shadow-sm"
                            onClick={() => setPopup(false)}>
                            No
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}