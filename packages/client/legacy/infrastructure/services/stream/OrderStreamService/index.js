import notificationService from 'infrastructure/services/Notification'
import { baseUrl } from 'infrastructure/api/base'
import dashboardStore from 'features/Restaurant/Dashboard/services/DashboardStore'
import constants from 'namespace-constants'
import ChangeStream from '../common/ChangeStream'

export const { NEW_ORDER_ARRIVED } = constants('OrderStreamService', ['NEW_ORDER_ARRIVED'])

class OrderStreamService {
  start = () => {
    const url = `${baseUrl}/Orders`
    // TODO: filter must be defined
    const filter = {}

    new ChangeStream({ url, filter }).onReceived(({ data: order }) => {
      notificationService.notify('Um novo pedido chegou', 'Clique aqui para abrir o Delivery')

      // TODO: is this always working?
      // TODO: must accept only type: create
      dashboardStore.addOrder(order)
      dashboardStore.increaseNewOrdersCounter(order)
    })
  }
}

const orderStreamService = new OrderStreamService()
orderStreamService.start()

export default orderStreamService
