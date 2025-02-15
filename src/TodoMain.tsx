import { observer } from "mobx-react-lite";
import { TodoList, useTodoApp } from "./Todos";
import { useEffect, useState } from "react";
import { action } from "mobx";
import { SearchBar } from "./SearchBar";
import { LabelNav } from "./LabelNav";
import { TodoLists } from "./TodoLists";

interface FilterOptions {
    searchString: string,
    label: string
}

function prepareForSearch(s: string): string {
    return s.replace(/\s+/g, "").toLowerCase();
}

export const TodoMain = observer(function () {
    const todoApp = useTodoApp();
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        searchString: '',
        label: ''
    });
    const [showNav, setShowNav] = useState(false);

    const search = prepareForSearch(filterOptions.searchString);

    function matchSearch(list: TodoList): boolean {
        if (filterOptions.label !== "" && !list.labels.includes(filterOptions.label))
            return false;

        if (prepareForSearch(list.text).includes(search) ||
            list.todos.some(t => prepareForSearch(t.text).includes(search)))
            return true;

        return false;
    }

    const filteredLists: TodoList[] = todoApp.todoLists
        .filter(list => matchSearch(list))
        .sort((a, b) => {
            if (a.pinned === b.pinned)
                return 0;
            if (a.pinned && !b.pinned)
                return -1;
            return 1;
        });

    useEffect(() => {
        if (filterOptions.searchString === "" &&
            filterOptions.label !== "" &&
            filteredLists.length === 0) {
            handleLabelSelection("");
        }
    }, [filteredLists]);

    const handleTodoListCreation = action(function () {
        const name = filterOptions.searchString.trim();
        todoApp.addTodoList(name || "New")
        if (filterOptions.label !== "") {
            const newList = todoApp.todoLists[0];
            todoApp.addLabel(filterOptions.label, newList);
        }
    });

    const handleLabelSelection = action(function (label: string) {
        setFilterOptions({ ...filterOptions, label: label });
    });

    const handleSearchInputChange = action(function (searchString: string) {
        setFilterOptions({ ...filterOptions, searchString: searchString });
    });

    return (
        <div className="@container sm:grid grid-cols-[minmax(9rem,1fr)_7fr]
            gap-y-4 gap-x-2 lg:gap-x-4 py-4 px-2 sm:px-4 sm:pl-0
            text-indigo-800">
            <div className="sticky top-2 sm:static z-1
            flex items-center col-start-2
            pb-4 mr-14 sm:mr-0">
                <button className="font-bold bg-indigo-400 text-indigo-50
                    sm:hover:bg-indigo-500 sm:hover:text-indigo-100
                    active:bg-indigo-600
                    rounded-full drop-shadow-lg
                    p-3 px-4 mr-2 sm:mr-4 flex-none
                    transition-colors sm:transition-none"
                    onClick={handleTodoListCreation}>
                    <span className="after:content-['New']
                    sm:after:content-['New_list...']"></span>
                </button>
                <SearchBar value={filterOptions.searchString} onChange={handleSearchInputChange} />
            </div>
            <LabelNav
                current={filterOptions.label}
                onSelect={handleLabelSelection}
                setShowNav={setShowNav}
                show={showNav} />
            <TodoLists lists={filteredLists} />
        </div>
    )
})