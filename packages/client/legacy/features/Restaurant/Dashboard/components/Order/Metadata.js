import React from 'react'
import { Caption, Body1 } from '@material/react-typography'
import Currency from 'infrastructure/components/Currency'
import { orderShape } from '../../shapes'

export default function Metadata({ order }) {
  return (
    <table className="restaurant-dashboard-order__metadata">
      <tbody>
        <tr>
          <td>
            <div className="restaurant-dashboard-order__metadata-item">
              <span className="restaurant-dashboard-order__order-table">
                <Caption>Mesa</Caption>
              </span>
              <Body1>{order.restaurant.table}</Body1>
            </div>
          </td>

          <td>
            <div className="restaurant-dashboard-order__metadata-item">
              <span className="restaurant-dashboard-order__order-total">
                <Caption>Total</Caption>
              </span>
              <Body1>
                <Currency value={order.total} />
              </Body1>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

Metadata.propTypes = {
  order: orderShape.isRequired,
}
