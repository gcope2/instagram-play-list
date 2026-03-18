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
      img {
        width: 300px;
        height: 300px;
        display: block;
        align-self: center;
        border: 2px solid blue;
      }
      button {
        background-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-beaverBlue);
        border-color: var(--ddd-theme-default-beaverBlue);
      }
      .button-wrapper {
        text-align: center;
      }
      .data-text {
        border: 2px solid green;
        display: inline-block;
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
      <div class="text-wrapper">
        <p></p>
      </div>
      <div class="button-wrapper">
        <button>Click for foxes</button>
      </div>`;
  }

  firstUpdated() {
    super.firstUpdated();
    this.loadInitialFox();
    this.setupButtonListener();
  }

  loadInitialFox() {
    const response = {
      "data": [
        {
          "image": "https://randomfox.ca/images/39.jpg",
          "link": "https://randomfox.ca/?i=39"
        }
      ]
    };

    const p = this.shadowRoot.querySelector('p');
    response.data.forEach((i) => {
      const textSpan = document.createElement('span');
      textSpan.className = 'data-text';
      textSpan.innerHTML = i.link;
      p.appendChild(textSpan);
      const image = document.createElement('img');
      image.src = i.image;
      p.appendChild(image);
    });
  }

  setupButtonListener() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', (e) => {
      this.getFoxes();
    });
  }

  getFoxes() {
    fetch("https://randomfox.ca/floof/").then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    }).then((data) => {
      const p = this.shadowRoot.querySelector('p');
      const textSpan = document.createElement('span');
      textSpan.className = 'data-text';
      textSpan.innerHTML = data.link;
      p.appendChild(textSpan);
      let image = document.createElement('img');
      image.src = data.image;
      p.appendChild(image);
    });
  }
}

globalThis.customElements.define(InstagramPlayListData.tag, InstagramPlayListData);