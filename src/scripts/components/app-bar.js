class AppBar extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        width: 100%;
        border: 1px solid;
      
      }
      .navbar {
        display: flex;
        height: 80px;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 4px 16px rgba(17, 17, 26, 0.05), 2px 8px 32px rgba(17, 17, 26, 0.05);
        
        padding: 0px 30px;
      }
      .navbar .nav-brand svg {
        width: 180px;
      }
      .navbar .nav-menu {
        display: none;
        background-color: transparent;
        border: none;
        padding: 15px;
        border: 1px solid #333;
        border-radius: 5px;
        cursor: pointer;
      }
      .navbar .mobile-menu {
        display: none;
        position: absolute;
        width: 100%;
        background-color: #333;
        top: 80px;
        right: 0;
        z-index: 900;
        animation: myAnim 2s ease 0s 1 normal forwards;
      }
      .navbar .mobile-menu .mobile-ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;
        list-style: none;
      }
      .navbar .mobile-menu .mobile-ul .mobile-link {
        text-align: center;
      }
      .navbar .mobile-menu .mobile-ul .mobile-link a {
        color: #fff;
        text-decoration: none;
        width: 100vw;
        border: 1px solid #fff;
        display: block;
        padding: 10px 0px;
      }
      .navbar .mobile-menu .mobile-ul .mobile-link a:hover {
        background-color: #F0EBE3;
        color: #333;
      }
      .navbar .nav-ul {
        display: flex;
        justify-content: end;
      }
      .navbar .nav-ul .nav-link {
        list-style: none;
        margin-left: 30px;
        font-weight: 300;
        display: flex;
        align-items: center;
      }
      .navbar .nav-ul .nav-link a {
        text-decoration: none;
        color: darkslategrey;
        padding: 10px 5px;
      }
      .navbar .nav-ul .nav-link a:hover {
        color: black;
        font-weight: 400;
        background-color: rgba(128, 128, 128, 0.1);
        border-radius: 10px;
      }
      @keyframes myAnim {
        0% {
          opacity: 0;
          transform: translateX(-50px);
        }
      
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @media only screen and (max-width: 768px) {
        .navbar .nav-ul {
          display: none;
        }
        .navbar .nav-menu {
          display: block;
          cursor: pointer;
        }
        .navbar .mobile-menu.open {
          display: block;
          animation: myAnim 2s ease 0s 1 normal both;
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
    <nav class="navbar">
      <div class="nav-brand">
        <svg width="266.5" height="35.54611033547806" viewBox="0 0 350 46.683446969670996" class="looka-1j8o68f">
          <defs id="SvgjsDefs1167"></defs>
          <g id="SvgjsG1168" featurekey="K5GtsI-0"
            transform="matrix(3.1457848038856016,0,0,3.1457848038856016,-3.082867667781887,-17.364733557474523)"
            fill="#000000">
            <path
              d="M0.98 6 l2.64 0 l0 11.56 l7.2 0 l0 2.44 l-9.84 0 l0 -14 z M23.8 20 l-1.18 -2.64 l-7.32 0 l-1.2 2.64 l-2.86 0 l6.28 -14 l2.88 0 l6.28 14 l-2.88 0 z M21.560000000000002 14.9 l-2.6 -5.96 l-2.6 5.96 l5.2 0 z M38.4 8.3 l-2.1 1.08 c-0.48 -0.8 -1.8 -1.56 -3.32 -1.56 c-1.96 0 -2.9 0.82 -2.9 1.86 c0 1.22 1.44 1.56 3.12 1.76 c2.92 0.36 5.64 1.12 5.64 4.46 c0 3.12 -2.76 4.46 -5.88 4.46 c-2.86 0 -5.06 -0.88 -6.1 -3.44 l2.2 -1.14 c0.62 1.54 2.24 2.22 3.94 2.22 c1.66 0 3.22 -0.58 3.22 -2.1 c0 -1.32 -1.38 -1.86 -3.24 -2.06 c-2.86 -0.34 -5.5 -1.1 -5.5 -4.24 c0 -2.88 2.84 -4.06 5.42 -4.08 c2.18 0 4.44 0.62 5.5 2.78 z M52 20 l-1.18 -2.64 l-7.32 0 l-1.2 2.64 l-2.86 0 l6.28 -14 l2.88 0 l6.28 14 l-2.88 0 z M49.76 14.9 l-2.6 -5.96 l-2.6 5.96 l5.2 0 z M67.47999999999999 7.74 l-1.64 1.68 c-0.94 -0.9 -2.34 -1.4 -3.56 -1.4 c-3 0 -4.82 2.28 -4.82 5.16 c0 2.3 1.34 4.68 4.82 4.68 c1.1 0 2.06 -0.24 3.16 -1.12 l0 -2.48 l-3.58 0 l0 -2.36 l6 0 l0 5.9 c-1.38 1.58 -3.12 2.52 -5.58 2.52 c-5.26 0 -7.4 -3.46 -7.4 -7.14 c0 -3.94 2.46 -7.58 7.4 -7.58 c1.88 0 3.76 0.72 5.2 2.14 z M79.22 14.68 l0 -8.7 l2.64 0 l0 14.02 l-1.64 0 l0 0.02 l-7.36 -9.46 l0 9.44 l-2.64 0 l0 -14 l2.14 0 z M86.61999999999999 6 l3.56 5.78 l3.72 -5.78 l3.18 0 l0 0.12 l-5.58 8.1 l0 5.78 l-2.64 0 l0 -5.78 l-5.38 -8.1 l0 -0.12 l3.14 0 z M109.35999999999999 20 l-1.18 -2.64 l-7.32 0 l-1.2 2.64 l-2.86 0 l6.28 -14 l2.88 0 l6.28 14 l-2.88 0 z M107.11999999999999 14.9 l-2.6 -5.96 l-2.6 5.96 l5.2 0 z">
            </path>
          </g>
        </svg>
      </div>

      <button type="button" id="menu" class="nav-menu">☰</button>
      <ul class="nav-ul">
        <li class="nav-link"><a href="/">Home</a></li>
        <li class="nav-link"><a href="#/favorite">Favorite</a></li>
        <li class="nav-link"><a href="https://www.linkedin.com/in/dimas-maulana-ishaq/">About Us</a></li>
      </ul>
      <div class="mobile-menu" id="mobile-menu">
        <ul class="mobile-ul">
          <li class="mobile-link"><a href="/">Home</a></li>
          <li class="mobile-link"><a href="#/favorite">Favorite</a></li>
          <li class="mobile-link"><a href="https://www.linkedin.com/in/dimas-maulana-ishaq/">About Us</a></li>
        </ul>
      </div>
    </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
