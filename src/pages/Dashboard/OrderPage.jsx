import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import OrderList from "../../components/Dashboard/Order/order-list";

function OrderPage() {
    return (
        <AdminLayout>
            <OrderList />
        </AdminLayout>
    )
}

export default OrderPage;