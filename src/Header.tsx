import { observer } from "mobx-react-lite";

export const Header = observer(function () {
    return <div className="w-full p-3 pr-
    bg-indigo-200 drop-shadow-lg
    flex justify-between text-indigo-700">
        <div className="text-2xl pl-2 pr-3
        border-l-2 border-b-2
        border-indigo-700 rounded-l-full
        bg-gradient-to-r from-indigo-400/40
        drop-shadow-sm
        first-letter:font-bold">
            {import.meta.env.VITE_APP_TITLE}
        </div>
        <button className="bg-linear-to-r from-indigo-400 to-indigo-700
        px-2 rounded-full
        drop-shadow-sm border-2 border-indigo-50
        hover:from-indigo-500 hover:to-indigo-800 hover:border-indigo-300">
            ☀️ 🌙
        </button>
    </div>
})