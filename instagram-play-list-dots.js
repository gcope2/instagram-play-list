/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `instagram-play-list-dots`
 * 
 * @demo index.html
 * @element instagram-play-list-dots
 */
export class InstagramPlayListDots extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-play-list-dots";
  }

  constructor() {
    super();
    this.total = 0;
    this.curIndex = 0;
    this.images = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      curIndex: { type: Number},
      images: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .dots {
        width: 75%;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding: var(--ddd-spacing-2) 0;
        justify-self: center;
      }
      .dots::-webkit-scrollbar {
        display: none;
      }
      .thumbnail {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        opacity: 0.5;
        border: 2px solid transparent;
      }
      .thumbnail.active {
        opacity: 1;
        border: 2px solid var(--ddd-theme-default-beaverBlue);
      }
      .track {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
        width: max-content;
      }
    `];
  }

  // Lit render the HTML
  render() {
    let thumbnails = [];
    for (let i = 0; i < this.total; i++) {
      const image = this.images[i] || {};
      const thumbSrc = image.thumbnail || image.url || '';

      thumbnails.push(html`
        <img 
          @click="${this._handleDotClick}" 
          data-index="${i}" 
          class="thumbnail ${i === this.curIndex ? 'active' : ''}" 
          src="${thumbSrc}" 
          alt="Thumbnail ${i + 1}" 
          loading="lazy"
        />
      `);
    }

    return html`
      <div class="dots" tabindex="0">
        <div class="track" title="Image Thumbnail Button">
          ${thumbnails}
        </div>
      </div>
      `;
  }

  _handleDotClick(e) {
    const indexChange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index: parseInt(e.target.dataset.index)
      },
    });
    this.dispatchEvent(indexChange);
  }

  firstUpdated() {
    this._syncCarousel("auto");
  }

  updated(changedProperties) {
    if (
      changedProperties.has("curIndex") ||
      changedProperties.has("images") ||
      changedProperties.has("total")
    ) {
      this._syncCarousel();
    }
  }

  _syncCarousel(behavior = "smooth") {
    const activeDot = this.renderRoot?.querySelector(".thumbnail.active");
    if (!activeDot) {
      return;
    }

    activeDot.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest",
    });
  }

}

globalThis.customElements.define(InstagramPlayListDots.tag, InstagramPlayListDots);