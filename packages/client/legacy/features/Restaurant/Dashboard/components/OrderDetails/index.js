import React from 'react'
import { observer } from 'mobx-react-lite'
import dashboardStore from '../../services/DashboardStore'
import OrderDetailsCardView from '../OrderDetailsCardView'
import OrderDetailsView from '../OrderDetailsView'

const OrderDetails = observer(() => {
  return (
    dashboardStore.selectedOrder && (
      <OrderDetailsCardView>
        <OrderDetailsView order={dashboardStore.selectedOrder} />
      </OrderDetailsCardView>
    )
  )
})

export default OrderDetails
