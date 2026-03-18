import { html, fixture, expect } from '@open-wc/testing';
import "../instagram-play-list.js";

describe("InstagramPlayList test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <instagram-play-list
        title="title"
      ></instagram-play-list>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
