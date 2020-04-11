import React from 'react'
import { ListItemGraphic } from '@material/react-list'
import { orderShape } from '../../shapes'

export default function Avatar({ order }) {
  return (
    <ListItemGraphic
      graphic={
        <img
          src={`https://api.adorable.io/avatars/285/${order.owner.id}.png`}
          className="restaurant-dashboard-order__avatar"
          alt="{order.owner.name || order.owner.username}"
        />
      }
    />
  )
}

Avatar.propTypes = {
  order: orderShape.isRequired,
}
