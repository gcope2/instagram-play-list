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
    return "instagram-play-list";
  }

  constructor() {
    super();
    this.curIndex = 0;
    this.topHeading = "";
    this.secondHeading = "";
    this.slides = Array.from(this.querySelectorAll("play-list-slide"));
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      curIndex: { type: Number, reflect: true },
      topHeading: { type: String},
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
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
      }
      .wrapper {
        display: flex;
        justify-content: center;
      }
      .arrow-wrapper {
        position: relative;
        top: -135px;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <instagram-play-list-data> </instagram-play-list-data>
      </div>
      <div class="arrow-wrapper">
        <instagram-play-list-arrow></instagram-play-list-arrow>
      </div>
      `;
  }

  firstUpdated() {  
    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has('curIndex')) {
      this._updateSlides();
    }
  }

  _updateSlides() {
    this.slides.forEach((slide, i) => {
      slide.active = (i === this.curIndex)
    });

    const curSlide = this.slides[this.curIndex];
    if (curSlide) {
      this.topHeading = curSlide.getAttribute("topHeading");
      this.secondHeading = curSlide.getAttribute("secondHeading");
    } 
  }

  next() {
    if (this.curIndex < this.slides.length - 1) {
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
    
    if (newIndex >= 0 && newIndex < this.slides.length) {
      this.curIndex = newIndex;
    }
  }

}

globalThis.customElements.define(InstagramPlayList.tag, InstagramPlayList);