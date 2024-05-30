import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'productList',
    initialState: {
        loading: 'idle',
        products: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductListThunkAction.pending, (state, action) => {
                state.loading = 'loading'
            })
            .addCase(fetchProductListThunkAction.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = 'idle'
            })
    }
})

export const fetchProductListThunkAction = createAsyncThunk('productList/fetchProductListThunkAction',
    async () => {
        let res = await fetch('https://664f004efafad45dfae1daed.mockapi.io/phone')
        let data = await res.json()
        return data
    }
)

export default productsSlice;