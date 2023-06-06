import { createSelector } from '@reduxjs/toolkit'

const todoSelector = state => state.todos.todoLists
const filterSearchSelector = state => state.filters.search
const filterStatusSelector = state => state.filters.status
const filterPrioritiesSelector = state => state.filters.priorities

const todoSelectors = createSelector(
    todoSelector,
    filterSearchSelector,
    filterStatusSelector,
    filterPrioritiesSelector,
    (todoLists, search, status, priorities) => {
        const todoRemaining = todoLists.filter(todo => {
            if (status === 'All') {
                return (priorities.length ? (
                    todo.name.toLowerCase().includes(search.toLowerCase()) &&
                    priorities.includes(todo.priority)
                ) :
                    todo.name.toLowerCase().includes(search.toLowerCase()))
            }

            return (status !== 'All' &&
                todo.name.toLowerCase().includes(search.toLowerCase()) && (
                    status === 'Completed' ?
                        todo.completed :
                        !todo.completed
                ) &&
                (priorities.length ? priorities.includes(todo.priority) : true)
            )
            // return true là tất cả 
        })

        return todoRemaining
    }
)

export default todoSelectors