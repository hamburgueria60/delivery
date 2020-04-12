import { css } from 'emotion'

import { html } from '~/utils/html'

const container = css`
  position: relative;
`
const icon = (primary) => css`
  position: absolute;
  margin-left: 0.5rem;

  input:focus + & {
    color: ${primary};
  }
`
const input = (primary) => css`
  padding: 0.75rem;
  padding-left: 2.25rem;
  border: none;
  &:focus {
    outline-color: ${primary};
  }
`

const inputWithIcon = ($colors) => ({
  scope: { placeholder: '@', icon: '@', type: '@' },
  template: html`
    <div class="${container}" md-theme="default" layout="row" layout-align="start center">
      <input class="${input($colors.get('primary'))}" layout-fill placeholder="{{placeholder}}" type="{{type}}" />
      <md-icon md-svg-src="{{icon}}" class="${icon($colors.get('primary'))}"></md-icon>
    </div>
  `,
})

export default angular.module('app.input-with-icon', []).directive('inputWithIcon', inputWithIcon).name
