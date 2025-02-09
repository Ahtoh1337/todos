import { observer } from "mobx-react-lite";

export const SearchBar = observer(function ({ value, onChange }: { value: string, onChange: (searchString: string) => void }) {
    return <div>
        <input
        placeholder="Search..."
        className="border-gray-400"
        value={value}
        onChange={e => onChange(e.target.value)} />
    </div>
});