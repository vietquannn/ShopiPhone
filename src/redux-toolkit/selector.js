import { createSelector } from "@reduxjs/toolkit"

export const productListSelector = (state) => state.productList.products
export const searchTextSelector = (state) => state.filters.searchText
export const recommendedSelector = (state) => state.filters.recommended
export const categorySelector = (state) => state.filters.category
export const colorSelector = (state) => state.filters.color
export const priceSelector = (state) => state.filters.price
export const loadingSelector = (state) => state.productList.loading

export const cartSelector = (state) => state.cart

export const remainProductListSelector = createSelector(
    productListSelector,
    searchTextSelector,
    recommendedSelector,
    colorSelector,
    priceSelector,
    categorySelector,
    (productList, searchText, recommended, color, price, category) => {
        let remainProductList = [...productList]
        if (searchText) {
            remainProductList = remainProductList.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if (recommended !== "All") {
            remainProductList = remainProductList.filter((item) => item.company === recommended)
        }
        if (category !== 'All') {
            remainProductList = remainProductList.filter((item) => item.category === category)
        }
        if (color !== 'All') {
            remainProductList = remainProductList.filter((item) => item.color === color)
        }
        if (price !== '0,0') {
            const [min, max] = price.split(',')
            if (min !== max) {
                remainProductList = remainProductList.filter((item) => Number(item.newPrice) >= Number(min) && Number(item.newPrice) < Number(max))
            }
            else {
                remainProductList = remainProductList.filter((item) => Number(item.newPrice) >= Number(min))
            }
        }

        return remainProductList;
    }
)