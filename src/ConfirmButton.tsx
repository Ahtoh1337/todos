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
                    bg-button-300 text-text-50
                    bg-linear-to-b from-button-400
                    font-bold
                    right-0 min-w-40 text-center
                    drop-shadow-md">
                    <p className="mb-2">
                        {confirmText}
                    </p>
                    <div className="flex justify-around items-center">
                        <button
                            className="py-3 sm:py-0 px-3.5 sm:px-2 rounded-full
                            bg-button-600
                            hover:bg-button-700 hover:text-text-300
                            hover:drop-shadow-sm"
                            onClick={() => {
                                onConfirm();
                                setPopup(false);
                            }}>
                            Yes
                        </button>
                        <button
                            className="py-3 sm:py-0 px-3.5 sm:px-2 rounded-full
                            bg-button-500
                            hover:bg-button-600 hover:text-text-300
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