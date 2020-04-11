import './index.scss'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { observer, Observer } from 'mobx-react-lite'
import Card from '@material/react-card'
import List, { ListDivider } from '@material/react-list'
import { Headline5 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'
import dashboardStore from '../../services/DashboardStore'
import Order from '../Order'

const OrderList = observer(() =>
  dashboardStore.orders.map((order, index) => (
    <React.Fragment key={order.id}>
      <Order order={order} />
      {dashboardStore.orders.length - 1 !== index && <ListDivider />}
    </React.Fragment>
  )),
)

const Orders = () => {
  const hasSpaceEnough = !useMediaQuery({ maxWidth: 768 })
  const hasSelectedOrder = !dashboardStore.selectedOrder

  return (
    <Observer>
      {() =>
        hasSpaceEnough || hasSelectedOrder ? (
          <Card className="restaurant-dashboard-orders">
            <div className="restaurant-dashboard-orders__scrollable">
              <List avatarList nonInteractive className="restaurant-dashboard-orders__list">
                <OrderList />
              </List>
            </div>

            {!dashboardStore.orders.length ? (
              <div className="restaurant-dashboard-orders__empty-state">
                <MaterialIcon icon="access_time" className="restaurant-dashboard-orders__icon" />
                <Headline5 className="restaurant-dashboard-orders__message">
                  Aguarde um pouco mais para que novos pedidos cheguem por aqui.
                </Headline5>
              </div>
            ) : null}
          </Card>
        ) : null
      }
    </Observer>
  )
}

export default Orders
