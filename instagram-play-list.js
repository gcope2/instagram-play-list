/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-play-list-data.js";
import "./instagram-play-list-arrow.js";
import "./instagram-play-list-slide.js";

/**
 * `instagram-play-list`
 * 
 * @demo index.html
 * @element instagram-play-list
 */
export class InstagramPlayList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-play-list";
  }

  constructor() {
    super();
    this.curIndex = 0;
    this.images = [];
    this.likes = {};
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      curIndex: { type: Number, reflect: true },
      images: { type: Array },
      likes: { type: Object },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-slateMaxLight);
        font-family: var(--ddd-font-navigation);
        width: 350px;
        height: 600px;
        margin: var(--ddd-spacing-2) var(--ddd-spacing-2) var(--ddd-spacing-2) 25px !important;
        box-shadow: var(--ddd-boxShadow-xl);
      }
      .wrapper {
        display: flex;
        justify-content: center;
      }
      .slide-content {
        display: absolute;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        box-sizing: border-box;
        padding: var(--ddd-spacing-2);
        min-height: 500px;
      }
      .slide-content img {
        width: 300px;
        height: 300px;
        object-fit: cover;
        display: block;
        margin: 0 auto;
      }
      .description {
        min-height: 40px;
      }
      .author-text {
        margin: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
      }
      .title-text {
        margin-top: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-black);
        margin-bottom: var(--ddd-spacing-1);
      }
      .description {
        max-width: 300px;
      }
      .likes-counter {
        display: flex;
        gap: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-14);
        align-items: center;
      }
      .heart {
        font-size: var(--ddd-font-size-l);
        color: var(--ddd-theme-default-black);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }
      .arrow-wrapper {
        position: relative; 
        top:-210px;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        ${this.images.length > 0
          ? this.images.map((image, index) => html`
              <instagram-play-list-slide ?active=${index === this.curIndex}>

                <div class="slide-content">
                  <h3 class="author-text">${image.author || 'Unknown Author'}</h3>
                  <img
                    src="${index === this.curIndex ? image.url : ''}"
                    alt="${image.description || 'Image'}"
                  />
                  
                  <div class="likes-counter">
                    <span
                      class=${classMap({heart: true, liked: Boolean(this.likes[image.url])})}
                      @click=${() => this._toggleLike(image)}
                    >${this.likes[image.url] ? '♥' : '♡'}</span>
                    <span class="likes-text">${this.likes[image.url] ? 'Liked' : 'Not Liked'}</span>
                  </div>
                  <h4 class="title-text">${image.title || ''}</h4>
                  <p class="description">${image.description || ''}</p>
                </div>

              </instagram-play-list-slide>
            `)
          : html`<div class="loading">Loading photos...</div>`}
      </div>

      <div class="arrow-wrapper">
        <instagram-play-list-arrow
          @next-clicked=${this.next}
          @prev-clicked=${this.back}
        ></instagram-play-list-arrow>
      </div>
      `;
  }

  firstUpdated() {
    super.firstUpdated();
    this.loadImages();
  }

  async loadImages() {
    try {
      const resp = await fetch('./data.json');
      if (!resp.ok) throw new Error('Failed to load data.json');
      const data = await resp.json();
      const images = (data.images || []).flatMap((item) => Object.values(item));
      this.images = images;
      this._loadLikesFromStorage();
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  _loadLikesFromStorage() {
    try {
      const saved = window.localStorage.getItem('instagramPlayListLikes');
      if (saved) {
        this.likes = JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Could not read likes from localStorage', err);
      this.likes = {};
    }
  }

  _saveLikesToStorage() {
    window.localStorage.setItem('instagramPlayListLikes', JSON.stringify(this.likes));
  }

  _toggleLike(image) {
    if (!image || !image.url) return;
    const key = image.url;
    const liked = Boolean(this.likes[key]);
    this.likes = {
      ...this.likes,
      [key]: !liked,
    };
    this._saveLikesToStorage();
  }

  next() {
    if (this.curIndex < this.images.length - 1) {
      this.curIndex++;
    }
  }

  back() {
    if (this.curIndex > 0) {
      this.curIndex--;
    }
  }

  _handleIndexChange(e) {
    const newIndex = e.detail.index;
    if (newIndex >= 0 && newIndex < this.images.length) {
      this.curIndex = newIndex;
    }
  }

}

globalThis.customElements.define(InstagramPlayList.tag, InstagramPlayList);