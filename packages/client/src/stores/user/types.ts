import { Attendant } from '@/types/Attendant'
import { Nullable } from '@/types/Nullable'

export interface UserState {
  current: Nullable<Attendant>
}
