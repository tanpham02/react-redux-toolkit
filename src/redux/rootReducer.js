import filterSlice from '../components/Filters/filterSlice'
import todoSlice from '../components/TodoList/todoSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    filters: filterSlice,
    todos: todoSlice
})


export default rootReducer  