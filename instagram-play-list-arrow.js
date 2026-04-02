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
      activeIndex: { type: Number },
      totalItems: { type: Number },
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
        margin-left: 2px;
        margin-top: -60px;
      }
      .next-wrapper {
        justify-content: right;
        margin-right: 2px;
        margin-top: -60px;
      }
      button {
        cursor: pointer;
        display: flex;
        width: 40px;
        height: 40px;
        border-radius: 10%;
        background-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-black);
        border-width: var(--ddd-border-size-md);
        border-color: solid black;
        font-size: var(--ddd-font-size-md);
        font-weight: var(--ddd-font-weight-bold);
        justify-content: center;
        align-items: center;
      }
      button:hover {
        opacity: 0.75;
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      button:disabled:hover {
        opacity: 0.5;
      }
    `];
  }

  // Lit render the HTML
  render() {
    const isFirst = this.activeIndex === 0;
    const isLast = this.activeIndex >= (this.totalItems - 1);

    return html`
    <div class="back-wrapper">
      <button
      class="back"
      title="Back Button"
      ?disabled=${isFirst}
      @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}><</button>
    </div>
    <div class="next-wrapper">
      <button
      class="next"
      title="Next Button"
      ?disabled=${isLast}
      @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>></button>
    </div>
    `;
  }
}

globalThis.customElements.define(InstagramPlayListArrow.tag, InstagramPlayListArrow);