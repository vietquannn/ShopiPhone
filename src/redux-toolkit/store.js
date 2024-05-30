import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/products-slice";
import filtersSlice from "../slices/filters-slice";
import cartSlice from "../slices/cart-slice";
import orderSlice from "../slices/order-slice";

const store = configureStore({
    reducer: {
        productList: productsSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store;