import toDate from '../../helpers/toDate'

export const EMPTY = 'EMPTY'

class OrderPickingService {
  LAST_READ_TIMESTAMP = 'LAST_READ_TIMESTAMP'

  getLastReadTimestamp() {
    const timestamp = localStorage.getItem(this.LAST_READ_TIMESTAMP)
    if (timestamp) {
      return new Date(timestamp)
    }
    return EMPTY
  }

  setLastReadTimestamp(timestamp) {
    if (timestamp) {
      localStorage.setItem(this.LAST_READ_TIMESTAMP, timestamp)
    }
  }

  isRead(order) {
    const lastReadTimestamp = this.getLastReadTimestamp()
    if (lastReadTimestamp !== EMPTY) {
      return lastReadTimestamp >= toDate(order.createdAt)
    }
    return true
  }
}

const orderPickingService = new OrderPickingService()
export default orderPickingService
