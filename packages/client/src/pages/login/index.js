import { css, cx } from 'emotion'

import inputWithIconDirective from '~/components/input-with-icon.directive'
import image from '~/images/login-background.jpg'
import { html } from '~/utils/html'

const background = css`
  background-image: url(${image});
  background-size: cover;
  min-height: calc(var(--vh, 1vh) * 100);
`
const gradient = css`
  background-image: linear-gradient(to top, rgba(0, 82, 176, 0.85), rgba(179, 64, 179, 0.85));
  min-height: calc(var(--vh, 1vh) * 100);
`
const container = css`
  padding: 2rem 1rem;
`
const form = css`
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 1rem 2rem 1rem;
  max-width: 48rem;
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
const login = (User) => ({
  template: html`
    <div class="${cx(background)}">
      <div class="${cx(gradient)}">
        <div class="${cx(container)}">
          <form autocomplete="off" class="${cx(form)}" md-whiteframe="4" layout="column" layout-align="center center">
            <div layout-fill layout="row" layout-align="space-between center">
              <div class="md-subhead">delivery</div>
              <div class="md-subhead">hamburgueria 60</div>
            </div>

            <div class="${cx(middle)}">
              <div layout="column" layout-align="center center">
                <h1 class="${cx(title, 'md-display-2')}" md-colors="{color:'purple'}">bem-vindo de volta</h1>

                <div layout-padding>
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
        </div>
      </div>
    </div>
  `,
  async controller() {
    try {
      await User.me()
    } catch (e) {
      // ignored
    }
  },
  scope: false,
  bindToController: true,
})

export default angular.module('app.login', [inputWithIconDirective]).directive('login', login).name
