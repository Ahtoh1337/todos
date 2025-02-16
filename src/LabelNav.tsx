import { observer } from "mobx-react-lite";
import { useTodoApp } from "./Todos";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const LabelNav = observer(function ({ current, show, onSelect, setShowNav }:
    {
        current: string
        show: boolean
        onSelect: (label: string) => void
        setShowNav: Dispatch<SetStateAction<boolean>>
    }) {
    const todoApp = useTodoApp();
    let navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleNavbarHide(e: MouseEvent) {
            if (show && !navbarRef.current?.contains(e.target as Node))
                setShowNav(false);
        }

        document.addEventListener('click', handleNavbarHide);

        return () => document.removeEventListener('click', handleNavbarHide);
    })

    return (
        <>
            <div className={`fixed z-1 top-0 -right-60 drop-shadow-xl
            transition-all
            pt-19 pl-2 pr-0 w-60 h-[100vh] sm:h-full text-xl
            sm:relative sm:drop-shadow-none sm:p-0 sm:w-full
            sm:text-base sm:right-0
            text-button-500
            sm:bg-background-50 bg-background-50/90
            flex flex-col items-end
            ${show ? "right-0" : ""}`}
                ref={navbarRef}>
                <ul className="sticky w-full sm:top-20 sm:max-h-[80vh]
                overflow-y-auto">
                    <li className="w-full">
                        <button
                            className={`w-full px-4 sm:pl-3
                        py-4  sm:py-2 
                        font-bold rounded-l-full sm:rounded-r-full sm:rounded-l-none
                        flex justify-between
                        ${current === ""
                            ? "bg-button-400 text-text-100"
                            : "text-button-500 hover:bg-button-200 hover:text-button-600"}`}
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
                                className={`w-full px-4 sm:pl-3
                                py-4 sm:py-2
                                font-bold rounded-l-full sm:rounded-r-full sm:rounded-l-none
                                flex justify-between
                                ${current === label
                                    ? "bg-button-400 text-text-100 drop-shadow-sm"
                                    : "text-button-500 hover:bg-button-200 hover:text-button-600"}`}
                                onClick={() => onSelect(label)}>
                                <span>{label}</span>
                                <span>{count}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button className={`sm:hidden rounded-md
            text-text-100
            h-12 w-12 text-5xl
            fixed top-2 right-2 z-1
            transition-colors
            bg-button-400`}
                onClick={e => {
                    e.stopPropagation();
                    setShowNav(!show)
                }}>
                {show ? "×" : "="}
            </button>
        </>
    )
})