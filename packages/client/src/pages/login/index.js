import { css, cx } from 'emotion'

import { html } from '~/utils/html'

const form = css`
  padding: 1rem 1rem 2rem 1rem;
`
const button = css`
  margin: 1rem;
`
const input = css`
  margin-bottom: 0;
  width: 100%;
  .md-errors-spacer {
    min-height: 0;
  }
`
const middle = css`
  padding-top: 4rem;
`
const title = css`
  font-weight: lighter;
`
const login = () => ({
  scope: false,
  template: html`
    <panel>
      <form autocomplete="off" class="${cx(form)}" md-whiteframe="4" layout="column" layout-align="center center">
        <div layout-fill layout="row" layout-align="space-between center">
          <div class="md-subhead">delivery</div>
          <div class="md-subhead">hamburgueria 60</div>
        </div>

        <div class="${cx(middle)}">
          <div layout="column" layout-align="center center">
            <h1 class="${cx(title, 'md-display-2')}" md-colors="{color:'purple'}">bem-vindo de volta</h1>

            <div layout-fill layout-padding>
              <div>
                <md-input-container class="${input}">
                  <label>Usuário</label>
                  <input id="login-identity" />
                </md-input-container>
              </div>

              <div>
                <md-input-container class="${input}">
                  <label>Senha</label>
                  <input id="login-password" type="password" />
                </md-input-container>
              </div>
            </div>

            <div>
              <md-button
                id="login-submit"
                type="submit"
                class="${cx(button, 'md-raised', 'md-primary')}"
                md-whiteframe="0"
              >
                Entrar
              </md-button>
            </div>
          </div>
        </div>
      </form>
    </panel>
  `,
})

export default angular.module('app.login', []).directive('login', login).name
