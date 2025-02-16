import { observer } from "mobx-react-lite";

export const SearchBar = observer(function ({ value, onChange }: { value: string, onChange: (searchString: string) => void }) {
    return <input
        type="search"
        placeholder="Search..."
        className="outline-2 outline-button-300
        p-3 w-full rounded-full bg-text-50
        -outline-offset-2 sm:outline-offset-0
        text-text-800
        placeholder:text-text-700
        focus:outline-button-600
        hover:outline-button-500
        min-w-20"
        value={value}
        onChange={e => onChange(e.target.value)} />
});