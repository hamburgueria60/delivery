import angular from 'angular'
import { css } from 'emotion'

import { getCurrentUser } from '~/services/api/user'
import { html } from '~/utils/html'

const message = css`
  padding: 2rem;
  text-align: center;
`

const redirect = ($state) => ({
  scope: false,
  template: html`<div>
    <floating ng-if="!done">
      <div class="${message}">Aguarde um pouco enquanto você é redirecionado...</div>
    </floating>

    <ui-view ng-if="done"></ui-view>
  </div>`,
  async controller($scope) {
    try {
      $scope.done = false
      await getCurrentUser()
      $state.go('root.panel.home')
    } catch (e) {
      $state.go('root.login')
    } finally {
      $scope.done = true
    }
  },
})

export default angular.module('app.redirect', []).directive('redirect', redirect).name
