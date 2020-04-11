import PropTypes from 'prop-types'

export const ownerShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
})

export const restaurantShape = PropTypes.shape({
  table: PropTypes.string,
})

export const orderShape = PropTypes.shape({
  additionalValue: PropTypes.number,
  createdAt: PropTypes.string,
  discountValue: PropTypes.number,
  id: PropTypes.string,
  owner: ownerShape,
  restaurant: restaurantShape,
  subtotal: PropTypes.number,
  total: PropTypes.number,
})

export const itemShape = PropTypes.shape({
  label: PropTypes.string,
  quantity: PropTypes.number,
})

export const itemsShape = PropTypes.arrayOf(itemShape)
