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

export const TodoMain = observer(function () {
    const todoApp = useTodoApp();
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        searchString: '',
        label: ''
    });

    const filteredLists: TodoList[] = todoApp.todoLists
        .filter(list =>
            list.text.trim().toLowerCase().includes(filterOptions.searchString.trim().toLowerCase())
            && (filterOptions.label === "" || list.labels.includes(filterOptions.label)))
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
        <div className="@container grid grid-cols-[1fr_7fr] gap-y-4 gap-x-2 lg:gap-x-4 p-4 pl-0 text-indigo-800">
            <div className="flex items-center pb-4 col-start-2">
                <button className="font-bold bg-indigo-400 text-indigo-50
                    hover:bg-indigo-500 hover:text-indigo-100
                    active:bg-indigo-600
                    rounded-full drop-shadow-lg
                    p-3 px-4 mr-4"
                    onClick={handleTodoListCreation}>
                    Create new list...
                </button>
                <SearchBar value={filterOptions.searchString} onChange={handleSearchInputChange} />
            </div>
            <LabelNav current={filterOptions.label} onSelect={handleLabelSelection} />
            <TodoLists lists={filteredLists} />
        </div>
    )
})