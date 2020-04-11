import identity from '@mdi/svg/svg/account.svg'
import password from '@mdi/svg/svg/lock.svg'
import { css, cx } from 'emotion'

import inputWithIconDirective from '~/components/input-with-icon.directive'
import logo from '~/images/logo-transparent.png'
import { html } from '~/utils/html'

const container = css`
  height: 100vh;
`
const form = css`
  margin: auto;
  max-width: 48rem;
  width: calc(100% - 2rem);
`
const button = css`
  margin: 0;
`
const image = css`
  width: 120px;
  padding: 4rem;
`
const login = () => ({
  template: html`
    <div class="${container}" md-theme="login" layout="row">
      <form
        autocomplete="off"
        md-colors="{background: 'background'}"
        class="${cx(form, 'md-whiteframe-2dp')}"
        layout="row"
        flex="noshrink"
      >
        <div layout-align="center start" layout-padding flex="100">
          <h1 class="md-title">Portal de acesso</h1>

          <h2 class="md-subhead">
            Informe suas credenciais de acesso
          </h2>

          <div>
            <input-with-icon id="login-identity" icon="${identity}" placeholder="Usuário"></input-with-icon>
          </div>

          <div>
            <input-with-icon icon="${password}" type="password" placeholder="Senha"></input-with-icon>
          </div>

          <div>
            <md-button id="login-submit" type="submit" class="${cx(button, 'md-primary', 'md-raised')}">
              Entrar
            </md-button>
          </div>
        </div>

        <div md-colors="{background: 'primary'}" layout="row" layout-align="center center" flex="noshrink">
          <div>
            <img src="${logo}" class="${image}" />
          </div>
        </div>
      </form>
    </div>
  `,
  controller: function Controller() {},
  scope: false,
  bindToController: true,
})

export default angular.module('app.login', [inputWithIconDirective]).directive('login', login).name
