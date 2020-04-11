import directive from 'infrastructure/wrapper/directive'
import { autorun } from 'mobx'
import dashboardStore from 'features/Restaurant/Dashboard/services/DashboardStore'
import Plural from 'infrastructure/services/Plural'
import template from './template.html'
import items from './items'
import './index.scss'

const plural = new Plural.Builder()
  .zero('')
  .other(number => `(${number}) `)
  .build()

class LeftNavController {
  constructor($scope) {
    this.items = items
    this.notifications = {}

    autorun(() => {
      const counter = dashboardStore.newOrdersCounter.size

      this.notifications['restaurant-dashboard'] = counter
      // TODO: since there is only one notification source, this code it's ok.
      // TODO: but probably title should have its own service
      document.title = `${plural.get(counter)}Hamburgueria 60`

      $scope.$applyAsync()
    })
  }

  getNotification(item) {
    return this.notifications[item.id]
  }
}

class LeftNav {
  static displayName = 'leftNav'

  constructor() {
    this.templateUrl = template
    this.replace = true
    this.controller = LeftNavController
    this.controllerAs = 'ctrl'
    this.bindToController = true
  }
}

export default directive(LeftNav)
