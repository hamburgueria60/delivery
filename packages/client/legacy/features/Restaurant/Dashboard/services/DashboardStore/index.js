import { observable, action } from 'mobx'
import expose from 'infrastructure/development/expose'
import orderPickingService from '../OrderPicking'

class DashboardStore {
  @observable orders = []

  @observable selectedOrder = null

  @observable printedOrders = new Set()

  @observable newOrdersCounter = new Set()

  @action setOrders(orders) {
    this.orders = orders
  }

  @action appendOrders(orders) {
    this.orders = [...this.orders, ...orders]

    this.orders.forEach(order => {
      if (!orderPickingService.isRead(order) && !this.isPrinted(order)) {
        this.newOrdersCounter.add(order.id)
      }
    })
  }

  isPrinted(order) {
    return this.printedOrders.has(order.id)
  }

  @action addOrder(order) {
    this.orders.unshift(order)
  }

  @action setSelectedOrder(order) {
    this.selectedOrder = order
  }

  @action addPrintedOrder(order) {
    this.printedOrders.add(order.id)
  }

  @action increaseNewOrdersCounter(order) {
    this.newOrdersCounter.add(order.id)
  }

  @action decreaseNewOrdersCounter(order) {
    this.newOrdersCounter.delete(order.id)
  }
}

const dashboardStore = new DashboardStore()
export default expose('dashboardStore', dashboardStore)
