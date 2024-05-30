import dayjs from "dayjs"

export default function OrderDetail({ order }) {
    const { orderInfo, orderDetails } = order
    return (
        <>
            <div className="modal fade" id="order-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Order details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <span className="fw-bolder">Order date: </span> {dayjs(orderInfo.orderDate).format('DD/MM/YYYY')}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bolder">Subtotal: </span> ${orderInfo.subTotal}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bolder">Shipping Fee: </span> {`${orderInfo.shipping ? "$" + orderInfo.shipping: 'Free'}`}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="fw-bolder">Total amount: </span> ${orderInfo.total}
                                    </li>
                                </ul>
                            </div>
                            <table className="table cart-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-end">Category</th>
                                        <th className="text-end">Company</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderDetails?.map((order) => (
                                            <tr key={order.id}>
                                                <td style={{ width: '200px' }}>
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
                                                <td className="text-end">
                                                    {order.category}
                                                </td>
                                                <td className="text-end">
                                                    {order.company}
                                                </td>
                                                <td className="text-end">
                                                    {order.quantity}
                                                </td>
                                                <td className="text-end">
                                                    ${order.amount}
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}