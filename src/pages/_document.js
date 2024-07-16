import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js" defer></script>
        <script dangerouslySetInnerHTML={{ __html: `
          customElements.define('swiper-container', class extends HTMLElement {
            connectedCallback() {
              new Swiper(this, { ...this.dataset });
            }
          });
          customElements.define('swiper-slide', class extends HTMLElement {});
        ` }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
