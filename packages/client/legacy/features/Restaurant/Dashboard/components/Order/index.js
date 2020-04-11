import './index.scss'
import React, { useState, useEffect } from 'react'
import { ListItem } from '@material/react-list'
import classNames from 'classnames'
import { orderShape } from '../../shapes'
import Header from './Header'
import Metadata from './Metadata'
import Actions from './Actions'
import Avatar from './Avatar'
import Label from './Label'
import isNewOrder from '../../helpers/isNewOrder'

const Order = ({ order }) => {
  const [endAnimation, setEndAnimation] = useState()

  useEffect(() => {
    let timer
    if (isNewOrder(order)) {
      timer = setTimeout(() => setEndAnimation(true), 10)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  })

  return (
    <ListItem
      className={classNames('restaurant-dashboard-order', {
        'restaurant-dashboard-order__hide': isNewOrder(order),
        'restaurant-dashboard-order__show': isNewOrder(order) && endAnimation,
      })}
    >
      <article className="restaurant-dashboard-order__container">
        <div className="restaurant-dashboard-order__rows">
          <div className="restaurant-dashboard-order__columns">
            <Avatar order={order} />
            <Label order={order} />
          </div>

          <div className="restaurant-dashboard-order__content">
            <div>
              <Header order={order} />
            </div>

            <Metadata order={order} />
          </div>
        </div>

        <Actions order={order} />
      </article>
    </ListItem>
  )
}

Order.propTypes = {
  order: orderShape.isRequired,
}

export default Order
