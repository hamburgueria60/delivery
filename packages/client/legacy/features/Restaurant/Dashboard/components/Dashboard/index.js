import { IntlProvider, addLocaleData } from 'react-intl'
import Button from '@material/react-button'
import pt from 'react-intl/locale-data/pt'
import React, { useEffect, useCallback } from 'react'
import './index.scss'
import { fetchOrders } from '../../services'
import dashboardStore from '../../services/DashboardStore'
import getLastReadTimestamp from '../../helpers/timestamp'
import OrderDetails from '../OrderDetails'
import orderPickingService from '../../services/OrderPicking'
import Orders from '../Orders'

fetchOrders()

addLocaleData(pt)

const RestaurantDashboard = () => {
  useEffect(() => {
    // TODO: any other place?
    const lastReadTimestamp = getLastReadTimestamp(dashboardStore.orders)
    orderPickingService.setLastReadTimestamp(lastReadTimestamp)
  }, [dashboardStore.orders])

  const handleRefreshButtonClick = useCallback(() => {
    dashboardStore.setOrders([])
    fetchOrders()
  })

  return (
    <IntlProvider locale="pt-BR">
      <>
        <Button onClick={handleRefreshButtonClick}>Atualizar lista de pedidos</Button>

        <table className="restaurant-dashboard">
          <tbody>
            <tr>
              <td>
                <Orders />
              </td>

              <td className="restaurant-dashboard__order-details">
                <OrderDetails />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </IntlProvider>
  )
}

export default function restaurantDashboard(reactDirective) {
  return reactDirective(RestaurantDashboard, [])
}

restaurantDashboard.displayName = 'restaurantDashboard'
