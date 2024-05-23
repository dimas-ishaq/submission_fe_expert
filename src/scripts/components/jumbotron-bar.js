class JumbotronBar extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
      width: 100%;
    }
    .jumbotron {
      position: relative !important;
      width: 100%;
    }
    .jumbotron picture {
      width: 100%;
      object-fit: cover;
      max-height: 460px;
    }
    .jumbotron img {
      width: 100%;
      object-fit: cover;
      max-height: 460px;
    }
    .jumbotron .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .jumbotron .wrapper .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    .jumbotron .wrapper .text {
      z-index: 999;
      color: #fff;
      text-align: center;
      text-shadow: 1px 5px 14px rgba(111, 111, 111, 0.6);
    }
    .jumbotron .wrapper .text .title {
      font-size: 3.2rem;
    }
    .jumbotron .wrapper .text .tagline {
      font-weight: 300;
    }
    @media only screen and (max-width: 768px) {
      .jumbotron .wrapper .text .title {
        font-size: 2.5rem !important;
      }
      .jumbotron .wrapper .text .tagline {
        font-size: 0.96rem;
      }
    }`;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <div class="jumbotron" >
      <picture>
        <source media="(max-width: 600px)" srcset="images/heros/hero-image_2-small.jpg" class="lazyload">
        <source type="image/jpeg" srcset="images/heros/hero-image_2.webp" class="lazyload">
        <img class="lazyload" src="images/heros/hero-image_2-large.jpg" alt="hero-image">
      </picture>
          <div class="wrapper">
            <div class="overlay"></div>
            <div class="text">
              <h1 class="title">Lasagnya Apps</h1>
              <p class="tagline">Explore the best restaurants in the world only through Lasagnya Apps</p>
            </div>
          </div>
        </div>`;
  }
}

customElements.define('jumbotron-bar', JumbotronBar);
