import { MutationPayload, Store } from 'vuex'

import notificationSound from '@/sounds/notification.mp3'
import { RootState } from '@/stores'

const playSound = (): void => {
  const birdSound = new Audio(notificationSound)
  birdSound.loop = false
  birdSound.play()
}

export default (store: Store<RootState>): void => {
  store.subscribe((mutation: MutationPayload): void => {
    if (mutation.type === 'Notifications/ADD_NOTIFICATION') {
      playSound()
    }
  })
}
