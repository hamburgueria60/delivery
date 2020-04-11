import React from 'react'
import { Caption } from '@material/react-typography'
import { observer } from 'mobx-react-lite'
import { orderShape } from '../../shapes'
import dashboardStore from '../../services/DashboardStore'
import isNewOrder from '../../helpers/isNewOrder'

const injectObservable = Component =>
  observer(props => {
    return <Component printedOrdersSize={dashboardStore.printedOrders.size} {...props} />
  })

const enhance = injectObservable

function Label({ order }) {
  return isNewOrder(order) ? <Caption className="restaurant-dashboard-order__new">Novo</Caption> : null
}

Label.propTypes = {
  order: orderShape.isRequired,
}

export default enhance(Label)
