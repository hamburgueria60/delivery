import { css } from 'emotion'

import { html } from '~/utils/html'

const padding = '0.5rem'
const background = css`
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  height: calc(100vh - ${padding} * 2);
`
const spacing = css`
  padding: ${padding};
`
const panel = () => ({
  transclude: true,
  template: html`
    <div class="${spacing}">
      <div class="${background}" md-whiteframe="4">
        <ui-view></ui-view>
      </div>
    </div>
  `,
})

export default angular.module('app.components.panel', []).directive('panel', panel).name
