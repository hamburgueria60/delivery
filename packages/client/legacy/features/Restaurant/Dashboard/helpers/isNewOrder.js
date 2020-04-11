import dashboardStore from '../services/DashboardStore'
import orderPickingService from '../services/OrderPicking'

export default function isNewOrder(order) {
  return !orderPickingService.isRead(order) && !dashboardStore.isPrinted(order)
}
