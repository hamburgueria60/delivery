import Item from './Item'

export default interface GroupedItem extends Item {
  quantity: number
  total: number
}
