/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `instagram-play-list-arrow`
 * 
 * @demo index.html
 * @element instagram-play-list-arrow
 */
export class InstagramPlayListArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-play-list-arrow";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .back-wrapper {
        justify-content: left;
        margin-left: 0px;
      }
      .next-wrapper {
        justify-content: right;
        margin-right: 0px;
      }
      button {
        background-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-beaverBlue);
        border-color: var(--ddd-theme-default-beaverBlue);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-rounded);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-black);
        border-width: var(--ddd-border-size-md);
      }
      button:hover {
        opacity: 0.8;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="back-wrapper">
      <button class="back" @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}><</button>
    </div>
    <div class="next-wrapper">
      <button class="next" @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>></button>
    </div>
    `;
  }
}

globalThis.customElements.define(InstagramPlayListArrow.tag, InstagramPlayListArrow);