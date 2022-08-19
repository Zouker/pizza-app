import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {itemsType} from '../../components/PizzaBlock/PizzaBlock';
import axios from 'axios';

export type PizzaState = {
    items: itemsType[]
    status: 'loading' | 'success' | 'error'
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: any) => {
    const {order, sortBy, category, search, currentPage} = params
    const {data} = await axios.get(`https://62aa3fdb3b3143855444bb5b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data
});

const initialState: PizzaState = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending.toString()]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled.toString()]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected.toString()]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    }
});

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer