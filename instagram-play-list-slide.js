/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `instagram-play-list-slide`
 * 
 * @demo index.html
 * @element instagram-play-list-slide
 */
export class InstagramPlayListSlide extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-play-list-slide";
  }

  constructor() {
    super();
    this.active = false;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      active: { type: Boolean, reflect: true},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host([active]) {
        display: block;
      }
      :host(:not([active])) {
        display: none;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="slide">
        <slot></slot>
      </div>
      `;
  }
}

globalThis.customElements.define(InstagramPlayListSlide.tag, InstagramPlayListSlide);