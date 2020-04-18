export interface Notification {
  id: string
  type: 'WHATSAPP' | 'CALL'
  createdAt: string
  read: boolean
}

export interface WhatsappNotification extends Notification {
  phoneNumber: string
}
