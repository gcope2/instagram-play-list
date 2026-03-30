/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-play-list-data.js";
import "./instagram-play-list-arrow.js";

/**
 * `instagram-play-list`
 * 
 * @demo index.html
 * @element instagram-play-list
 */
export class InstagramPlayList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-play-list-data";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      authorText: { type: String },
      descriptionText: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-black);
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
        <instagram-play-list-data></instagram-play-list-data>
      `;
  }


}

globalThis.customElements.define(InstagramPlayList.tag, InstagramPlayList);