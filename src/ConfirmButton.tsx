import { useState } from "react"

export default function ConfirmButton({ children, className, confirmText, onConfirm, disabled }:
    {
        children: any
        className: string
        confirmText: string
        onConfirm: () => void
        disabled?: boolean
    }) {
    const [popup, setPopup] = useState(false);

    return (
        <div className="relative">
            <button
                disabled={disabled}
                className={className}
                onClick={() => setPopup(!popup)}>
                {children}
            </button>
            {popup &&
                <div className="absolute rounded-md p-2
                bg-indigo-400 text-indigo-50 font-bold
                right-0 min-w-40 text-center
                drop-shadow-md">
                    <p className="mb-2">
                        {confirmText}
                    </p>
                    <div className="flex justify-around items-center">
                        <button
                            className="px-2 rounded-full
                            bg-indigo-600
                            hover:bg-indigo-800 hover:text-indigo-100"
                            onClick={() => {
                                onConfirm();
                                setPopup(false);
                            }}>
                            Yes
                        </button>
                        <button
                            className="px-2 rounded-full
                            bg-indigo-300
                            hover:bg-indigo-500 hover:text-indigo-100"
                            onClick={() => setPopup(false)}>
                            No
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}