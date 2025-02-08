import { observer } from "mobx-react-lite";

export const Header = observer(function () {
    return <div >
        <h1 className="text-2xl">{import.meta.env.VITE_APP_TITLE}</h1>
    </div>
})