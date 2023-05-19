import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todoLists',
    initialState: JSON.parse(localStorage.getItem('todoListsStorage')) ?? [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        toogleTodo: (state, action) => {
            const newTodoList = state.map((todo, index) => (
                action.payload.includes(index) ?
                    { ...todo, completed: true } :
                    { ...todo, completed: false }
            ))
            return newTodoList
        }
    }
})

export default todoSlice.reducer
export const { addTodo, toogleTodo } = todoSlice.actions