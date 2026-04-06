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
        position: relative;
        width: 350px;
        height: 610px;
        background-color: light-dark (
          var(--ddd-theme-default-slateMaxLight),
          var(--ddd-theme-default-coalyGray)
        );
        color: light-dark (
          var(--ddd-theme-default-black),
          var(--ddd-theme-default-white)
        );
        font-family: var(--ddd-font-navigation);
        box-shadow: var(--ddd-boxShadow-xl);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-2) var(--ddd-spacing-2) 25px !important;
      }
      .slide-content {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: var(--ddd-spacing-2);
        min-height: 500px;
        width: 100%;
      }
      .main-image {
        width: 300px;
        height: 300px;
        object-fit: cover;
        display: block;
        margin: var(--ddd-spacing-2) auto;
        align-self: center;
      }
      .profile-pic {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      .author-row {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        margin: var(--ddd-spacing-2);
      }
      .author-text {
        font-size: var(--ddd-font-size-s);
        margin: 0;
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
      }
      .author-info {
        display: flex;
        flex-direction: column;
        margin-top: -10px;
      }
      .username,
      .user-since {
        margin: 0 0 0 var(--ddd-spacing-12);
        font-size: 15px;
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
      }
      .slide-footer {
        position: absolute;
        top: calc(300px + var(--ddd-spacing-16) + 60px);
        left: 0;
        right: 0;
        padding: var(--ddd-spacing-2);
        display: flex;
        flex-direction: column;
        max-width: 350px;
        margin: 0 auto;
      }
      .likes-share-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--ddd-spacing-5);
        margin-left: var(--ddd-spacing-2);
        margin-right: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-2);
      }
      .likes-counter {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
      }
      .heart {
        cursor: pointer;
        font-size: var(--ddd-font-size-l);
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }
      .date-taken {
        font-size: 15px;
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
        margin-left: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-2);
      }
      .share-button {
        font-size: var(--ddd-font-size-xs);
        border-width: var(--ddd-border-size-sm);
        border-color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
        border-radius: 10%;
        background-color: transparent;
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
      }
      .post-text {
        display: flex;
        align-items: baseline;
        font-size: 17px;
        gap: var(--ddd-spacing-1);
        margin-left: var(--ddd-spacing-2);
        margin-bottom: 0;
      }
      .post-collumn {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-1);
        margin-bottom: var(--ddd-spacing-2);
      }
      .post-username,
      .title-text {
        margin: 0;
      }
      .post-username {
        font-weight: var(--ddd-font-weight-bold);
        color: light-dark(var(--ddd-theme-default-black), var(--ddd-theme-default-white));
      }
      .desc-text {
        font-size: 17px;
        color: light-dark(
          var(--ddd-theme-default-black),
          var(--ddd-theme-default-white)
        );
        margin: 0;
        margin-left: var(--ddd-spacing-2);
      }
      .dots-area {
        position: absolute;
        top: calc(var(--ddd-spacing-20) + 300px);
        left: 0;
        right: 0;
        padding: var(--ddd-spacing-2);
      }
      .arrow-wrapper {
        position: relative;
        top: -85px;
        margin-top: var(--ddd-spacing-8);
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
        ${this.images.length > 0
          ? this.images.map((image, index) => html`

              <instagram-play-list-slide ?active=${index === this.curIndex}>
                <div class="slide-content">
                  <div class="author-row">
                    <img class="profile-pic"
                      src="${image['profile-pic'] || ''}"
                      alt="${image.author || 'Unknown Author'} profile picture"/>
                    <h3 class="author-text">${image.author || 'Unknown Author'}</h3>
                  </div>

                  <div class="author-info">
                    <p class="username">@${image['username'] || 'Unknown'}</p>
                    <p class="user-since">User Since: ${image['user-since'] || 'Unknown'}</p>
                  </div>

                  <img class="main-image"
                    src="${index === this.curIndex ? image.url : ''}"
                    alt="${image.description || 'Image'}"/>
                </div>
              </instagram-play-list-slide>
            `)
          : html`<div class="loading">Loading photos...</div>`}

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
          <div class="likes-share-wrapper">
            <div class="likes-counter">
              <span
                class=${classMap({heart: true, liked: Boolean(this.likes[image.url])})}
                title="Like Button"
                @click=${() => this._toggleLike(image)}
              >${this.likes[image.url] ? '♥' : '♡'}</span>
              <span class="likes-text">${this.likes[image.url] ? 'Liked' : 'Not Liked'}</span>
            </div>
            <div class="share-button">
              <button class="share-button" title="Share Button" @click=${() => this._sharePost(this.images[this.curIndex])}>Share</button>
            </div>
          </div>

          <div class="post-collumn">
            <div class="post-text">
              <p class="post-username">@${image['username'] || 'Unknown'}</p>
              <p class="title-text">${image.title || ''}</p>
            </div>

            <div>
              <p class="desc-text">${image.description || ''}</p>
            </div>
          </div>

          <div>
          <span class="date-taken">Taken: ${image['date-taken'] ? this._formatDate(image['date-taken']) : ''}</span>
          </div>
        </div>
      ` : '')}

        <div class="arrow-wrapper">
          <instagram-play-list-arrow
            activeIndex=${this.curIndex}
            totalItems=${this.images.length}
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

  _sharePost(image) {
    if (!image) return;

    const shareData = {
      title: image.title || "Check out this post!",
      text: image.description || "Check out this post!",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .catch(err => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  }

  async loadImages() {
    try {
      const resp = await fetch('/api/data');
      if (!resp.ok) throw new Error('Failed to load data.json');

      const data = await resp.json();
      this.images = data.images || [];

      this._loadLikesFromStorage();
      this._loadIndexFromStorage();
      
      const slide = new URLSearchParams(window.location.search).get('slide');
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
    this.likes = {
      ...this.likes,
      [key]: !Boolean(this.likes[key]),
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