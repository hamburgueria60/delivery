import { Notification } from '@/types/Notification'

export interface NotificationsState {
  notifications: Map<string, Notification>
}
