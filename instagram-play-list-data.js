/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `instagram-play-list-data`
 * 
 * @demo index.html
 * @element instagram-play-list-data
 */
export class InstagramPlayListData extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-play-list-data";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: black;
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .image-wrapper img {
        width: 300px;
        height: 300px;
        display: block;
        margin: 0 auto;
      }
      .likes-counter {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-15);
      }
      .heart {
        color: black;
        font-size: var(--ddd-font-size-m);
        font-weight: var(--ddd-font-weight-semiBold);
      }
      .url-wrapper a {
        color: black;
        text-decoration: none;
        font-size: var(--ddd-font-size-xs);
        font-weight: normal;
      }
      .wrapper {
        margin-top: -20px;
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <div>
          <h3>Author</h3>
        </div>

        <div class="image-wrapper"></div>

        <div class="likes-counter">
          <span class="heart">♡</span>
          <span class="likes-text">362 Likes</span>
        </div>

        <div class="url-wrapper"></div>

        <div>
          <p>Description.............................</p>
        </div>
      </div>
      `;
  }

  firstUpdated() {
    super.firstUpdated();
    this.getFoxes();
  }

  loadInitialFox() {
    this.getFoxes();
  }

  getFoxes() {
    fetch("https://randomfox.ca/floof/")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        const imageWrap = this.shadowRoot.querySelector('.image-wrapper');
        const urlWrap = this.shadowRoot.querySelector('.url-wrapper');

        imageWrap.innerHTML = '';
        urlWrap.innerHTML = '';

        const image = document.createElement('img');
        image.src = data.image;
        image.alt = 'Random fox';
        imageWrap.appendChild(image);

        const link = document.createElement('a');
        link.href = data.link;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = data.link;
        urlWrap.appendChild(link);
      })
      .catch((error) => {
        console.error('Failed to load fox image:', error);
      });
  }
}

globalThis.customElements.define(InstagramPlayListData.tag, InstagramPlayListData);