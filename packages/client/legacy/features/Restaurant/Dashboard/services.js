import OrdersApi from 'infrastructure/api/OrdersApi'
import dashboardStore from './services/DashboardStore'
// import getInterval from './helpers/getInterval';

export const fetchOrders = async () => {
  // const { startsAt, endsAt } = getInterval();
  const response = await OrdersApi.find({
    where: {
      and: [
        {
          type: 'RESTAURANT',
          status: 'SENT',
          // createdAt: { gte: startsAt, lte: endsAt },
        },
      ],
    },
    order: 'createdAt DESC',
  })

  const payload = response.data
  const orders = payload.data

  dashboardStore.appendOrders(orders)
}

export default fetchOrders
