import { observer } from "mobx-react-lite";

export const Header = observer(function () {
    return <div className="w-full p-4 sm:p-3 pr-
    drop-shadow-lg bg-indigo-200 bg-gradient-to-b from-indigo-300
    flex justify-between text-indigo-700">
        <div className="text-3xl sm:text-2xl pl-2 pr-3
        border-l-2 border-b-2
        border-indigo-700 rounded-l-full
        bg-gradient-to-r from-indigo-400/40
        drop-shadow-sm
        first-letter:font-bold">
            {import.meta.env.VITE_APP_TITLE}
        </div>
    </div>
})