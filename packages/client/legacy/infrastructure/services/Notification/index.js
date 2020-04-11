class NotificationService {
  start = async () => {
    if (!('Notification' in window)) {
      throw new Error('Este navegador não suporta notificações.')
    }

    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }
  }

  async notify(title, body) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, { body })
      notification.onclick = this.handleNotificationClick
    }
  }

  handleNotificationClick = e => {
    window.focus()
    e.target.close()
  }
}

const notificationService = new NotificationService()
notificationService.start()

export default notificationService
