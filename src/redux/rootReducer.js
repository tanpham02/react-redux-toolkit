import filterSlice from '../components/Filters/filterSlice'
import todoSlice from '../components/TodoList/todoSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    filters: filterSlice,
    todoLists: todoSlice
})


export default rootReducer  