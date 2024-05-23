class FooterBar extends HTMLElement {
  _style = null;

  _shadowRoot = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
      margin-top: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80px;
      background-color: #333;
      color: #fff;
    }
    @media only screen and (max-width: 480px) {
      :host{
        font-size: 0.96rem;
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
    <div class="copyright">
    <p>“Copyright © 2020 - Lasagnya Apps”</p>
  </div>
         `;
  }
}

customElements.define('footer-bar', FooterBar);
