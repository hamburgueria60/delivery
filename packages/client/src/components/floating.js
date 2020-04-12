import { css } from 'emotion'

import { html } from '~/utils/html'

const background = css`
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  max-width: 48rem;
`
const spacing = css`
  padding: 2rem 1rem;
`
const floating = () => ({
  transclude: true,
  template: html`
    <div class="${spacing}">
      <div class="${background}" md-whiteframe="4">
        <ng-transclude></ng-transclude>
      </div>
    </div>
  `,
})

export default angular.module('app.components.floating', []).directive('floating', floating).name
