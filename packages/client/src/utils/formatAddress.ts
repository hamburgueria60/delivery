import Address from '@/types/Address'
import { Nullable } from '@/types/Nullable'

export const formatAddressSingleLine = (address: Address): Nullable<string> => {
  return !address.isEmpty() ? `${address.streetName}, ${address.number} - ${address.location}` : '-'
}
