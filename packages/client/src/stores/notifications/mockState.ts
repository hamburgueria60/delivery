import { Notification } from '@/types/Notification'

import initialState from './initialState'

const isProduction = process.env.NODE_ENV !== 'production'

const makeNotification = <T extends Notification>(props: T): Notification => {
  return props
}

export default isProduction
  ? {
      notifications: new Map([
        [
          '1',
          makeNotification({
            id: '1',
            type: 'WHATSAPP',
            createdAt: '2020-01-08T10:45:00-0300',
            phoneNumber: '19999549974',
            read: false,
          }),
        ],
        [
          '2',
          makeNotification({
            id: '2',
            type: 'CALL',
            createdAt: '2020-01-07T10:45:00-0300',
            phoneNumber: '92981766071',
            read: false,
          }),
        ],
      ]),
    }
  : initialState
