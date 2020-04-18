import { CreateOrderState } from './create-order'
import { NotificationsState } from './notifications'
import { OrdersState } from './orders'
import { UserState } from './user'

export interface RootState {
  Orders: OrdersState
  CreateOrder: CreateOrderState
  Notifications: NotificationsState
  User: UserState
}
