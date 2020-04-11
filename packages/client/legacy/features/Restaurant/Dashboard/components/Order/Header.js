import React from 'react'
import { Body1, Caption } from '@material/react-typography'
import { FormattedRelative } from 'react-intl'
import ShortId from 'infrastructure/components/ShortId'
import { orderShape } from '../../shapes'

export default function Header({ order }) {
  return (
    <>
      <div className="restaurant-dashboard-order__rows restaurant-dashboard-order__header">
        <Body1 className="restaurant-dashboard-order__owner">{order.owner.name || order.owner.username}</Body1>

        <Caption className="restaurant-dashboard-order__divider">&nbsp;·&nbsp;</Caption>

        <Caption
          className="restaurant-dashboard-order__created-at"
          title={new Date(order.createdAt).toLocaleString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        >
          <FormattedRelative value={order.createdAt} />
        </Caption>
      </div>

      <div className="restaurant-dashboard-order__id" title={order.id}>
        <Caption>
          {`Pedido: `}
          <ShortId id={order.id} />
        </Caption>
      </div>
    </>
  )
}

Header.propTypes = {
  order: orderShape.isRequired,
}
