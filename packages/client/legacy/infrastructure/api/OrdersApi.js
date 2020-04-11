import { baseUrl, apiGet } from './base'

class OrdersApi {
  constructor() {
    this.url = `${baseUrl}/Orders`
  }

  find(filter) {
    return apiGet(this.url, { params: { filter } })
  }
}

const ordersApi = new OrdersApi()
export default ordersApi
