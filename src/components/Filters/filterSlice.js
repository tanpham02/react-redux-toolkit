import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priorities: []
    },
    reducers: {
        status: (state, action) => {
            state.status = action.payload
        },
        search: (state, action) => {
            state.search = action.payload
        },
        priorities: (state, action) => {
            state.priorities = action.payload
        },
    }
})

export default filterSlice.reducer
export const {
    status,
    search,
    priorities
} = filterSlice.actions