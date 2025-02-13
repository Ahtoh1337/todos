import { observer } from "mobx-react-lite";

export const SearchBar = observer(function ({ value, onChange }: { value: string, onChange: (searchString: string) => void }) {
    return <input
        type="search"
        placeholder="Search..."
        className="outline-2 outline-indigo-300
        p-3 w-full rounded-full bg-white
        -outline-offset-2 sm:outline-offset-0
        placeholder:text-indigo-300
        focus:outline-indigo-700
        hover:outline-indigo-400
        min-w-20"
        value={value}
        onChange={e => onChange(e.target.value)} />
});