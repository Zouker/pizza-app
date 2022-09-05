import {createAsyncThunk} from '@reduxjs/toolkit';
import {Pizza, SearchPizzaParams} from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {order, sortBy, category, search, currentPage} = params
    const {data} = await axios.get<Pizza[]>(`https://62aa3fdb3b3143855444bb5b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data
});