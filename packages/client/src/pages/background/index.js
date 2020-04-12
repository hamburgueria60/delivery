import angular from 'angular'
import { css, cx } from 'emotion'

import image from '~/images/login-background.jpg'
import { html } from '~/utils/html'

const container = css`
  background-image: url(${image});
  background-size: cover;
  min-height: calc(var(--vh, 1vh) * 100);
`
const gradient = css`
  background-image: linear-gradient(to top, rgba(0, 82, 176, 0.85), rgba(179, 64, 179, 0.85));
  min-height: calc(var(--vh, 1vh) * 100);
`
const background = () => ({
  transclude: true,
  template: html`<div class="${cx(container)}">
    <div class="${cx(gradient)}">
      <ng-transclude></ng-transclude>
    </div>
  </div>`,
})

export default angular.module('app.background', []).directive('background', background).name
