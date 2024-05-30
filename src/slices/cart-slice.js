import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        orderId: uuid(),
        orderInfo: {
            subTotal: 0,
            shipping: 0,
            total: 0,
            orderDate: Date.now() //timestamp
        },
        orderDetails: []
    },
    reducers: {
        addToCart: (state, action) => {
            let cartItem = state.orderDetails?.find((item) => item?.id === action.payload.id)
            if (cartItem?.id) {
                cartItem.quantity = Number(cartItem.quantity) + 1
                cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)
            }
            else {
                state.orderDetails?.push({
                    ...action.payload,
                    quantity: 1,
                    amount: Number(action.payload.newPrice)
                })
            }
            let subtotal = 0;
            for (let item of state.orderDetails) {
                subtotal += Number(item.amount)
            }
            state.orderInfo.subTotal = subtotal
            state.orderInfo.total = subtotal + state.orderInfo?.shipping
        },
        removeCartItem: (state, action) => {
            state.orderDetails = state.orderDetails?.filter(item => item.id !== action.payload.id)

            let subtotal = 0;
            for (let item of state.orderDetails) {
                subtotal += Number(item.amount)
            }
            state.orderInfo.subTotal = subtotal
            state.orderInfo.total = subtotal + state.orderInfo?.shipping
        },
        incrementQuantity: (state, action) => {
            let cartItem = state.orderDetails?.find((item) => item.id === action.payload.id)
            cartItem.quantity += 1
            cartItem.amount = Number(cartItem.newPrice) * cartItem.quantity

            let subtotal = 0;
            for (let item of state.orderDetails) {
                subtotal += Number(item.amount)
            }
            state.orderInfo.subTotal = subtotal
            state.orderInfo.total = subtotal + state.orderInfo?.shipping
        },
        decrementQuantity: (state, action) => {
            let cartItem = state.orderDetails?.find((item) => item.id === action.payload.id)
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1
                cartItem.amount = Number(cartItem.newPrice) * cartItem.quantity

                let subtotal = 0;
                for (let item of state.orderDetails) {
                    subtotal += Number(item.amount)
                }
                state.orderInfo.subTotal = subtotal
                state.orderInfo.total = subtotal + state.orderInfo?.shipping
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutThunkAction.pending, (state, action) => {

            })
            .addCase(checkoutThunkAction.fulfilled, (state, action) => {
                state.orderId = uuid();
                state.orderInfo = {
                    subTotal: 0,
                    shipping: 0,
                    total: 0,
                    orderDate: Date.now()
                }
                state.orderDetails = []
            })
    }
})

export const checkoutThunkAction = createAsyncThunk('cart/checkoutThunkAction',
    async (data) => {
        let res = await fetch('', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let result = await res.json()
        return result
    }
)

export default cartSlice