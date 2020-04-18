import randomize from 'randomatic'

import { DELIVERY_NEW_ORDER } from '@/constants'
import store from '@/stores'
import { WhatsappNotification } from '@/types/Notification'

interface DeliveryNewOrderCustonEvent {
  phoneNumber: string
}

class ExtensionListener {
  private addWhatsappNotification(phoneNumber: string): void {
    const notification: WhatsappNotification = {
      id: randomize('Aa0', 10),
      type: 'WHATSAPP',
      read: false,
      phoneNumber,
      createdAt: new Date().toISOString(),
    }
    store.commit('Notifications/ADD_NOTIFICATION', notification)
  }

  public listen(): void {
    document.addEventListener(DELIVERY_NEW_ORDER, ((e: CustomEvent<DeliveryNewOrderCustonEvent>): void => {
      const { phoneNumber } = e.detail
      this.addWhatsappNotification(phoneNumber)
    }) as EventListener)
  }
}

export default new ExtensionListener()
