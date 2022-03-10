import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Bookmark } from '@firebook/core'
import { gridArea } from './helper'

@customElement('fude-root')
export class App extends LitElement {
  static styles = css`
    label {
      font-weight: normal;
      font-size: 36px;
      color: #718f6b;
    }
    input {
      height: 100%;
      padding-left: 16px;
      font-size: 24px;
      color: #718f6b;
      border: 5px solid #c5cdc0;
    }

    input:focus {
      outline: none;
    }
    button {
      height: 100%;
      width: 100%;
      background-color: #5e7348;
      border: 1px solid #5e7348;
      color: white;
      font-weight: normal;
      letter-spacing: .2rem;
      font-size: 24px
    }
    .title-label {
      grid-area: title-label;
    }
    .title-input {
      grid-area: title-input;
    }
    .url-label {
      grid-area: url-label;
    }
    .url-input {
      grid-area: url-input;
    }
    .tag-label {
      grid-area: tag-label;
    }
    .tag-input {
      grid-area: tag-input;
    }

    .submit-button {
      grid-area: submit-button;
    }

    .app-container {
      padding: 16px;
      letter-spacing: .1rem;
      display: grid;
      font-family: sans-serif;
      background-color: #fdf6e3;
      height: 100vh;

      grid-template: "................................ ..." auto
                     "title-label ........................" auto
                     "..............................   ..." 8px
                     "........................ title-input" 42px
                     "..............................   ..." 16px
                     "url-label .........................." auto
                     "..............................   ..." 8px
                     ".........................  url-input" 42px
                     "..............................   ..." 16px
                     "tag-label .........................." auto
                     "..............................   ..." 8px
                     ".......................... tag-input" 42px
                     ".............................. ....." 52px
                     "...................... submit-button" 48px
                     ".............................. ....." auto / 24px auto;
      align-content: start;
    }
  `

  render() {
    return html`
      <form class="app-container">
        <label class="title-label">Title</label>
        <input class="title-input"></input>
        <label class="url-label">Url</label>
        <input class="url-input"></input>
        <label class="tag-label">Tags</label>
        <input class="tag-input"></input>
        <button class="submit-button">Submit</button>
      </form>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fude-root': App
  }
}
