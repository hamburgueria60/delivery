import React from 'react'
import Currency from 'infrastructure/components/Currency'
import { FormattedTime, FormattedDate } from 'react-intl'
import { Headline4, Body1, Caption } from '@material/react-typography'
import shortid from 'shortid'
import CurrencyWithoutSymbol from 'infrastructure/components/CurrencyWithoutSymbol'
import ShortId from 'infrastructure/components/ShortId'
import { orderShape } from '../../shapes'
import './index.scss'

const OrderDetailsView = ({ order }) => (
  <div className="restaurant-dashboard-order-details-view__content">
    <div className="restaurant-dashboard-order-details-view__id">
      <ShortId id={order.id} />
    </div>

    <Headline4 className="restaurant-dashboard-order-details-view__total">
      <Currency value={order.total} />
    </Headline4>

    <div className="restaurant-dashboard-order-details-view__metadata">
      <div>
        <div className="restaurant-dashboard-order-details-view__metadata-item">
          <span className="restaurant-dashboard-order-details-view__order-table">
            <Caption>Mesa</Caption>
          </span>
          <Body1>{order.restaurant.table}</Body1>
        </div>
      </div>

      <div>
        <div className="restaurant-dashboard-order-details-view__metadata-item">
          <span className="restaurant-dashboard-order-details-view__owner">
            <Caption>Atendente</Caption>
          </span>
          <Body1>{order.owner.name || order.owner.username}</Body1>
        </div>
      </div>

      <div>
        <div className="restaurant-dashboard-order-details-view__metadata-item">
          <span className="restaurant-dashboard-order-details-view__time">
            <Caption>Horário</Caption>
          </span>
          <Body1>
            <FormattedDate value={order.createdAt} year="2-digit" month="numeric" day="numeric" />
            &nbsp;
            <FormattedTime value={order.createdAt} />
          </Body1>
        </div>
      </div>
    </div>

    <table className="restaurant-dashboard-order-details-view__table" cellSpacing={16}>
      <tbody>
        {order.items.map(item => (
          <tr className="restaurant-dashboard-order-details-view__table-row" key={shortid()}>
            <td className="restaurant-dashboard-order-details-view__quantity">{item.quantity}</td>
            <td className="restaurant-dashboard-order-details-view__item">
              <div className="restaurant-dashboard-order-details-view__item-name">{item.name}</div>

              {!item.default && (
                <div className="restaurant-dashboard-order-details-view__item-primary-label">{item.label.primary}</div>
              )}
            </td>
            <td className="restaurant-dashboard-order-details-view__item-total">
              <CurrencyWithoutSymbol value={item.price * item.quantity} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="restaurant-dashboard-order-details-view__thanks">
      A <strong>Hamburgueria 60</strong> agradece a sua preferência ❤
    </div>
  </div>
)

OrderDetailsView.propTypes = {
  order: orderShape.isRequired,
}

export default OrderDetailsView
