import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector } from "../redux-toolkit/selector";
import cartSlice, { checkoutThunkAction } from './../slices/cart-slice';
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function CartPage() {
    const dispatch = useDispatch()
    const cart = useSelector(cartSelector)
    const { orderInfo, orderDetails } = cart

    const handleRemoveCartItem = (order) => {
        Swal.fire({
            title: "Are you sure to remove this item?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cartSlice.actions.removeCartItem(order))
                toast.info(`${order.title} removed to cart`)
            }
        });
    }

    const handleCheckout = () => {
        Swal.fire({
            title: "Are you sure checkout?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    ...cart,
                    orderInfo: {
                        ...cart.orderInfo,
                        'status': 'order'
                    }
                }
                dispatch(checkoutThunkAction(data))
                toast.success('cart checkout')
            }
        });
    }
    return (
        <MainLayout>
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className=" py-2">Cart Detail</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">

                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-end">Total</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderDetails?.map((order) => (
                                        <tr key={order.id}>
                                            <td style={{ maxWidth: '200px' }}>
                                                <div className="d-flex align-items-center">
                                                    <img className="product-image" src={order.img} alt="" />
                                                    <div className="d-inline">
                                                        <div className="d-block fw-bolder mb-2">{order.title}</div>
                                                        <div className="d-block">{order.color}</div>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                ${order.newPrice}
                                            </td>
                                            <td >
                                                <div className="cart-quantity-wrap">
                                                    <div className="cart-quantity">
                                                        {
                                                            order.quantity > 1 ? (
                                                                <span
                                                                    onClick={() => dispatch(cartSlice.actions.decrementQuantity(order))}
                                                                >-</span>
                                                            ) : (
                                                                <span>-</span>
                                                            )
                                                        }
                                                        <span>{order.quantity}</span>
                                                        <span
                                                            onClick={() => dispatch(cartSlice.actions.incrementQuantity(order))}
                                                        >+</span>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                ${order.amount}
                                            </td>
                                            <td>
                                                <div className="action-wrap">
                                                    <span className="btn-remove"
                                                        onClick={() => handleRemoveCartItem(order)}
                                                    >&times;</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4" style={{ minWidth: '300px' }}>
                        <div className="order-summary p-3">
                            <h3 className="border-bottom py-2">Order Summary</h3>
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Subtotal</span>
                                    <span className="fw-bolder">${orderInfo?.subtotal}</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Shipping</span>
                                    <span className="fw-bolder">{`${orderInfo?.shipping ? orderInfo?.shipping : 'Free'}`}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                                <span className="fs-6">Total</span>
                                <span className="fw-bolder fs-6">${orderInfo?.total}</span>
                            </div>
                        </div>
                        <div className="py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout"
                            onClick={handleCheckout}
                        >
                            CHECKOUT
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CartPage