import { observer } from "mobx-react-lite";

export const Header = observer(function () {
    return <div className="w-full p-3.5 pr-
    bg-header-100
    flex justify-between">
        <div className="text-3xl sm:text-2xl pl-2 pr-1
        border-l-2 border-b-2
        text-text-300
        border-text-300 rounded-l-full
        font-bold">
            {import.meta.env.VITE_APP_TITLE}
        </div>
    </div>
})