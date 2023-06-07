import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        status: 'Rest',
        todoLists: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            // getAllTodos
            .addCase(getAllTodosThunk.pending, (state, action) => {
                state.status = 'Loading'
                return state
            })
            .addCase(getAllTodosThunk.fulfilled, (state, action) => {
                state.status = 'Rest'
                state.todoLists = action.payload
                return state
            })
            .addCase(getAllTodosThunk.rejected, (state, action) => {
                state.status = 'Error'
                return state
            })

            // addTodo
            .addCase(addTodoThunk.fulfilled, (state, action) => {
                state.todoLists.push(action.payload)
            })

            // toggleTodo
            .addCase(toggleTodoThunk.fulfilled, (state, action) => {
                state.todoLists.find(todo => (
                    todo.id === action.payload.id &&
                    (todo.completed = action.payload.completed))
                )
                return state
            })

            // editTodo
            .addCase(editTodoThunk.fulfilled, (state, action) => {
                state.todoLists.find(todo => (
                    todo.id === action.payload.id && (todo.name = action.payload.name)
                ))
            })

            // deleteTodo
            .addCase(deleteTodoThunk.fulfilled, (state, action) => {
                const index = state.todoLists.findIndex(todo => todo.id === action.payload)
                if (index !== -1) {
                    state.todoLists.splice(index, 1)
                }
                return state
            })

    }
})

const getAllTodosThunk = createAsyncThunk(
    'todos/getAllTodos',
    async () => {
        const res = await axios('http://localhost:8001/todoLists')
        const datas = await res.data
        return datas
    }
)

const addTodoThunk = createAsyncThunk(
    'todos/addTodoThunk',
    async (newTodo) => {
        const res = await axios.post('http://localhost:8001/todoLists', newTodo)
        const todo = await res.data
        return todo
    }
)

const toggleTodoThunk = createAsyncThunk(
    'todos/toggleTodoThunk',
    async (id) => {
        const findById = await axios(`http://localhost:8001/todoLists/${id}`)
        const todo = await findById.data
        const dataUpdate = {
            ...todo,
            completed: !todo.completed
        }
        const updateTodo = await axios.put(`http://localhost:8001/todoLists/${id}`, dataUpdate)
        const res = await updateTodo.data
        return res
    }
)

const editTodoThunk = createAsyncThunk(
    'todos/editTodoThunk',
    async (todoEdit) => {
        const res = await axios.put(`http://localhost:8001/todoLists/${todoEdit.id}`, {
            ...todoEdit,
            name: todoEdit.name
        })
        const output = await res.data
        return output
    }
)

const deleteTodoThunk = createAsyncThunk(
    'todos/deleteTodoThunk',
    async (id) => {
        await axios.delete(`http://localhost:8001/todoLists/${id}`)
        return id
    }
)

export default todoSlice.reducer
export {
    getAllTodosThunk,
    addTodoThunk,
    toggleTodoThunk,
    editTodoThunk,
    deleteTodoThunk
}