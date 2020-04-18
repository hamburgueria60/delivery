import { Nullable } from './Nullable'

interface AddressInput {
  id: string
  streetName: string
  number: string
  location: string
  complement: string
  distance: Nullable<number>
  phoneNumber: string
}

export default class Address {
  public id: string

  public streetName: string

  public number: string

  public location: string

  public complement: string

  public distance: Nullable<number>

  public phoneNumber: string

  public constructor(address: AddressInput) {
    this.id = address.id
    this.streetName = address.streetName
    this.number = address.number
    this.location = address.location
    this.complement = address.complement
    this.distance = address.distance
    this.phoneNumber = address.phoneNumber
  }

  public isEmpty(): boolean {
    return !(this.streetName && this.number && this.location)
  }
}
