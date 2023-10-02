import { createSlice } from "@reduxjs/toolkit";

// const addToCart = localStorage.getItem(addtocart)

const initialState = {
    search: 'd',
    totalPrice: '',
    totalDis: '',
    totalAmount: ''
}

const productSlice = createSlice({
    name: "dmj",
    initialState,
    reducers: {
        addSearch: (state, payload) => {
            state.search = payload
        },
        addPrice: (state, payload) => {
            state.totalPrice = payload
        },
        addDiscount: (state, payload) => {
            state.totalDis = payload
        },
        addTotalAmount: (state, payload) => {
            state.totalAmount = payload
        }
    }

});


export const { addSearch } = productSlice.actions

export default productSlice.reducer;