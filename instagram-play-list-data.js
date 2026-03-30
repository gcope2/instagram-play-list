/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-play-list-arrow.js";
import "./instagram-play-list-slide.js";
import "./instagram-play-list-dots.js";

/**
 * `instagram-play-list-data`
 * 
 * @demo index.html
 * @element instagram-play-list-data
 */
export class InstagramPlayListData extends DDDSuper(I18NMixin(LitElement)) {

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
        height: 610px;
        margin: var(--ddd-spacing-2) var(--ddd-spacing-2) var(--ddd-spacing-2) 25px !important;
        box-shadow: var(--ddd-boxShadow-xl);
        color: black;
        position: relative;
      }
      .wrapper {
        display: flex;
        justify-content: center;
      }
      .slide-content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        box-sizing: border-box;
        padding: var(--ddd-spacing-2);
        min-height: 500px;
      }
      .main-image {
        display: absolute;
        width: 300px;
        height: 300px;
        object-fit: cover;
        display: block;
        margin: 0 auto;
        align-self: center;
      }
      .thumbnail-image {
        display: absolute;
        width: 40px;
        height: 40px;
        margin-top: var(--ddd-spacing-2);
        align-self: center;
      }
      .profile-pic {
        display: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      .description {
        display: absolute;
        max-width: 300px;
      }
      .author-row {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        margin: var(--ddd-spacing-2);
      }
      .author-text {
        display: absolute;
        font-size: var(--ddd-font-size-s);
        margin: 0;
      }
      .title-text {
        display: absolute;
        margin-top: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-black);
        margin-bottom: var(--ddd-spacing-1);
      }
      .likes-date-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--ddd-spacing-1);
      }
      .likes-counter {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
      }
      .date-taken {
        display: absolute;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-black);
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
      .dots-area {
        position: absolute;
        top: calc(var(--ddd-spacing-12) + 300px);
        left: 0;
        right: 0;
        padding: var(--ddd-spacing-2);
      }
      .slide-footer {
        position: absolute;
        top: calc(var(--ddd-spacing-2) + 300px + 60px);
        left: 0;
        right: 0;
        padding: var(--ddd-spacing-2);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        box-sizing: border-box;
        max-width: 300px;
        margin: 0 auto;
        margin-top: var(--ddd-spacing-8);
      }
      .arrow-wrapper {
        position: relative;
        top: -85px;
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
                  <div class="author-row">
                    <img
                      class="profile-pic"
                      src="${image['profile-pic'] || ''}"
                      alt="${image.author || 'Unknown Author'} profile picture"
                    />
                    <h3 class="author-text">${image.author || 'Unknown Author'}</h3>
                  </div>
                  <img
                    class="main-image"
                    src="${index === this.curIndex ? image.url : ''}"
                    alt="${image.description || 'Image'}"
                  />
                </div>

              </instagram-play-list-slide>
            `)
          : html`<div class="loading">Loading photos...</div>`}
      </div>

      </div>

      <div class="dots-area">
        <instagram-play-list-dots
          .images=${this.images}
          .curIndex=${this.curIndex}
          .total=${this.images.length}
          @play-list-index-changed=${this._handleIndexChange}>
        </instagram-play-list-dots>
      </div>

      ${this.images.map((image, index) => index === this.curIndex ? html`
        <div class="slide-footer">
          <div class="likes-date-wrapper">
            <div class="likes-counter">
              <span
                class=${classMap({heart: true, liked: Boolean(this.likes[image.url])})}
                @click=${() => this._toggleLike(image)}
              >${this.likes[image.url] ? '♥' : '♡'}</span>
              <span class="likes-text">${this.likes[image.url] ? 'Liked' : 'Not Liked'}</span>
            </div>
            <span class="date-taken">${image['date-taken'] ? this._formatDate(image['date-taken']) : ''}</span>
          </div>
          <h4 class="title-text">${image.title || ''}</h4>
          <p class="description">${image.description || ''}</p>
        </div>
      ` : '')}

      <div class="arrow-wrapper">
          <instagram-play-list-arrow
            @next-clicked=${this.next}
            @prev-clicked=${this.back}>
          </instagram-play-list-arrow>
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
      this._loadIndexFromStorage();
      
      const urlParams = new URLSearchParams(window.location.search);
      const slide = urlParams.get('slide');
      if (slide !== null) {
        const index = parseInt(slide, 10) - 1;
        if (!isNaN(index) && index >= 0 && index < this.images.length) {
          this.curIndex = index;
        }
      }
      this._updateUrl();
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

  _loadIndexFromStorage() {
    try {
      const saved = window.localStorage.getItem('instagramPlayListCurrentIndex');
      if (saved !== null) {
        const index = parseInt(saved, 10);
        if (index >= 0 && index < this.images.length) {
          this.curIndex = index;
        }
      }
    } catch (err) {
      console.warn('Could not read index from localStorage', err);
    }
  }

  _saveIndexToStorage() {
    window.localStorage.setItem('instagramPlayListCurrentIndex', this.curIndex.toString());
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
      this._saveIndexToStorage();
      this._updateUrl();
    }
  }

  back() {
    if (this.curIndex > 0) {
      this.curIndex--;
      this._saveIndexToStorage();
      this._updateUrl();
    }
  }

  _handleIndexChange(e) {
    const newIndex = e.detail.index;
    if (newIndex >= 0 && newIndex < this.images.length) {
      this.curIndex = newIndex;
      this._saveIndexToStorage();
      this._updateUrl();
    }
  }

  _updateUrl() {
    const url = new URL(window.location);
    url.searchParams.set('slide', (this.curIndex + 1).toString());
    window.history.replaceState(null, '', url);
  }

  _formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

}

globalThis.customElements.define(InstagramPlayListData.tag, InstagramPlayListData);