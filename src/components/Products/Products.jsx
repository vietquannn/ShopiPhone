import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, remainProductListSelector } from "../../redux-toolkit/selector";
import { fetchProductListThunkAction } from "../../slices/products-slice";

function Products() {
    const loading = useSelector(loadingSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductListThunkAction())
    }, [dispatch])
    const remainProductList = useSelector(remainProductListSelector)
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            <div className="row">
                {
                    loading === 'loading' ? <p>Loading...</p> : (
                        remainProductList?.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Products;