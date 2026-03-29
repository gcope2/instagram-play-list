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
    this.authorText = "Author";
    this.descriptionText = "Description";
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
        margin-top: var(--ddd-spacing-14);
      }
      .heart {
        color: var(--ddd-theme-default-black);
        font-size: var(--ddd-font-size-m);
        font-weight: var(--ddd-font-weight-semiBold);
      }
      .url-wrapper a {
        color: var(--ddd-theme-default-black);
        text-decoration: none;
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-regular);
      }
      .author-text {
        color: var(--ddd-theme-default-black);
        margin-top: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-2);
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <div>
          <h3 class="author-text">${this.authorText}</h3>
        </div>

        <div class="image-wrapper"></div>

        <div class="likes-counter">
          <span class="heart">♡</span>
          <span class="likes-text">362 Likes</span>
        </div>

        <div>
          <p class="description-text">${this.descriptionText}</p>
        </div>
      </div>
      `;
  }

  firstUpdated() {
    super.firstUpdated();
    this.getData();
  }

  loadInitialFox() {
    this.getData();
  }

  getData() {
    fetch('./data.json')
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        if (!data || !data.images || data.images.length === 0) {
          console.error('No images found in JSON data');
          return;
        }

        const imageWrap = this.shadowRoot.querySelector('.image-wrapper');

        imageWrap.innerHTML = '';

        const images = data.images.flatMap(item => Object.values(item));
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex];

        if (!selectedImage || !selectedImage.url) {
          console.error('Selected image has no URL');
          return;
        }

        this.authorText = selectedImage.author || 'Unknown Author';
        this.descriptionText = selectedImage.description || 'No description available';

        const image = document.createElement('img');
        image.src = selectedImage.url;
        image.alt = selectedImage.description || 'Image';
        imageWrap.appendChild(image);
      })
      .catch((error) => {
        console.error('Failed to load image from JSON:', error);
      });
  }
}

globalThis.customElements.define(InstagramPlayListData.tag, InstagramPlayListData);