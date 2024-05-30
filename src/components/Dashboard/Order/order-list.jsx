import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderListThunkAction } from "../../../slices/order-slice";
import dayjs from "dayjs";
import { MdReadMore } from "react-icons/md";
import OrderDetail from "./order-detail";
import { Modal } from "bootstrap";

function OrderList() {
    const dispatch = useDispatch()
    const orderList = useSelector((state) => state.order.orderList)
    useEffect(() => {
        dispatch(fetchOrderListThunkAction())
    }, [])

    const handleShowOrderDetail = (order) => {
        let orderElement = new Modal(document.getElementById('order-detail'))
        orderElement.show()
        setOrderSelected(order)
    }

    const [orderSelected, setOrderSelected] = useState({})
    return (
        <div className="container">
            <div className="row">
                <div className='col-md-12'>
                    <h5>Order Management</h5>
                    <table className="table table-striped order-table">
                        <thead>
                            <tr>
                                <th className="text-end align-middle">Order Date</th>
                                <th className="text-end align-middle">Total Products</th>
                                <th className="text-end align-middle">Subtotal</th>
                                <th className="text-end align-middle">Shipping</th>
                                <th className="text-end align-middle">Total Amount</th>
                                <th className="text-end align-middle">Status</th>
                                <th className="text-end align-middle">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList?.map((order) => (
                                    <tr key={order.id}>
                                        <td className="text-end align-middle">{dayjs(order.orderInfo.orderDate).format('DD-MMM-YYYY')}</td>
                                        <td className="text-end align-middle">{order.orderDetails.length}</td>
                                        <td className="text-end align-middle">${order.orderInfo.subTotal}</td>
                                        <td className="text-end align-middle">{order.orderInfo.shipping}</td>
                                        <td className="text-end align-middle">${order.orderInfo.total}</td>
                                        <td className="text-end align-middle">
                                            <span className="badge bg-warning text-dark">
                                                {order.orderInfo.status}
                                            </span>
                                        </td>
                                        <td className="text-end align-middle">
                                            <MdReadMore role="button" size={25} className="text-primary"
                                                onClick={() => handleShowOrderDetail(order)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <OrderDetail order={orderSelected} />
        </div>
    )
}

export default OrderList;