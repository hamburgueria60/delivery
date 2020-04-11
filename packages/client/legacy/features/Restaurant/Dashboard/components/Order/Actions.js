import React, { useCallback } from 'react'
import IconButton from '@material/react-icon-button'
import FileSearchIcon from 'mdi-react/FileSearchIcon'
import PrinterIcon from 'mdi-react/PrinterIcon'
import print from 'infrastructure/services/print'
import { orderShape } from '../../shapes'
import dashboardStore from '../../services/DashboardStore'

export default function Actions({ order }) {
  const handlePreviewClick = useCallback(() => {
    dashboardStore.setSelectedOrder(order)
  }, [])
  const handlePrintClick = useCallback(() => {
    dashboardStore.setSelectedOrder(order)
    dashboardStore.addPrintedOrder(order)
    dashboardStore.decreaseNewOrdersCounter(order)

    print()
  }, [])

  return (
    <div className="restaurant-dashboard-order__actions">
      <IconButton className="restaurant-dashboard-order__action" title="Visualizar" onClick={handlePreviewClick}>
        <FileSearchIcon size={16} />
      </IconButton>

      <IconButton className="restaurant-dashboard-order__action" title="Imprimir" onClick={handlePrintClick}>
        <PrinterIcon size={16} />
      </IconButton>
    </div>
  )
}

Actions.propTypes = {
  order: orderShape.isRequired,
}
