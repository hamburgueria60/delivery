import PropTypes from 'prop-types'
import React from 'react'
import Card from '@material/react-card'
import './index.scss'

const OrderDetailsCardView = ({ children }) => {
  return (
    <div className="restaurant-dashboard-order-details-card-view">
      <Card className="restaurant-dashboard-order-details-card-view__container">{children}</Card>
    </div>
  )
}

OrderDetailsCardView.propTypes = {
  children: PropTypes.node.isRequired,
}

export default OrderDetailsCardView
