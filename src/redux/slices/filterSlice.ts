import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store';

export type FilterState = {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: {
        name: string,
        sortProperty: string
    }
}

const initialState: FilterState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        }
    },
});

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer