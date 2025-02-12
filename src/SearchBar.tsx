import { observer } from "mobx-react-lite";

export const SearchBar = observer(function ({ value, onChange }: { value: string, onChange: (searchString: string) => void }) {
    return <input
        placeholder="Search..."
        className="outline-2 outline-indigo-300
        p-3 flex-auto rounded-full bg-white
        placeholder:text-indigo-300
        focus:outline-indigo-700
        hover:outline-indigo-400"
        value={value}
        onChange={e => onChange(e.target.value)} />
});