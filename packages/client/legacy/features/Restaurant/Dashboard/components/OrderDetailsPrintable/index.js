import React from 'react'
import dashboardStore from '../../services/DashboardStore'
import OrderDetailsView from '../OrderDetailsView'
import './index.scss'

const OrderDetailsPrintable = () => {
  return (
    <div className="restaurant-dashboard-order-details-printable">
      <OrderDetailsView order={dashboardStore.selectedOrder} />
    </div>
  )
}

export default OrderDetailsPrintable
