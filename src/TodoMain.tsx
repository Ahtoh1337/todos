import { observer } from "mobx-react-lite";
import { TodoList, useTodoApp } from "./Todos";
import { useState } from "react";
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
            && (filterOptions.label === "" || list.labels.includes(filterOptions.label)));

    const handleTodoListCreation = action(function () {
        todoApp.addTodoList("New")
    });

    const handleTodoListClear = action(function () {
        todoApp.todoLists.splice(0, todoApp.todoLists.length);
        todoApp._listNextId = 0;
    })

    const handleLabelSelection = action(function (label: string) {
        setFilterOptions({ ...filterOptions, label: label });
    });

    const handleSearchInputChange = action(function (searchString: string) {
        setFilterOptions({ ...filterOptions, searchString: searchString });
    });

    return (
        <div>
            <button className="border-2 border-gray-400 hover:border-blue-800" onClick={handleTodoListCreation}>Create new todo list...</button>
            <button className="border-2 border-gray-400 hover:border-blue-800 ml-2" onClick={handleTodoListClear}>Clear</button>
            <SearchBar value={filterOptions.searchString} onChange={handleSearchInputChange} />
            <LabelNav current={filterOptions.label} onSelect={handleLabelSelection} />
            <TodoLists lists={filteredLists} />
            <pre>
                {JSON.stringify(todoApp, null, 2)}
            </pre>
        </div>
    )
})