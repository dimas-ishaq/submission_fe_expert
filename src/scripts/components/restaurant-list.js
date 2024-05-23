class RestaurantList extends HTMLElement {
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
      height: auto;
    }
    .list {
      margin-top: 30px;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px 10px;
    }
    
    @media only screen and (max-width: 768px) {
      .list {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    @media only screen and (max-width: 480px) {
      .list {
        grid-template-columns: repeat(1, 1fr) !important;
      }
    }
    `;
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
    <div class="list">
    <slot></slot>
  </div>
  `;
  }
}

customElements.define('restaurant-list', RestaurantList);
