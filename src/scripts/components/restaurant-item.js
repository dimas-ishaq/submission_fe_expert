import CONFIG from '../globals/config';

class RestaurantItem extends HTMLElement {
  _restaurant = {
    id: null,
    name: null,
    description: null,
    pictureId: null,
    city: null,
    rating: null,
  };

  _style = null;

  constructor() {
    super();
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
      width:100%;
      border-radius: 5px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .restaurant_item {
      display: flex;
      flex-direction: column;
    }
    .restaurant_item .card {
      display: flex;
      flex-direction: column;
    }
    .restaurant_item .card .card_img_tag {
      display: flex;
      position: relative;
      flex-direction: column;
      width: 100%;
    }
    .restaurant_item .card .card_img_tag img {
      object-fit: cover;
      max-height: 260px;
    }
    .restaurant_item .card .card_img_tag span {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 5px 10px;
      background-color: rgba(211, 0, 169, 0.8941176471);
      color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      font-weight: 400;
    }
    .restaurant_item .card .card_text {
      padding: 20px;
    }
    .restaurant_item .card .card_text span {
      flex-shrink: 0;
      padding: 2px 6px;
      border-radius: 5px;
      background-color: rgb(255, 205, 80);
      font-size: 0.8rem;
      font-weight: 300;
    }
    .restaurant_item .card .card_text p {
      font-weight: 300;
      font-size: 0.95rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
    }
    a{
      text-decoration: none;
    }
    `;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  set restaurant(value) {
    this._restaurant = value;
    // Re-render
    this.render();
  }

  get restaurant() {
    return this._restaurant;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
    <article class="restaurant_item" id="${this._restaurant.id}">
      <div class="card">
        <div class="card_img_tag">
          <img class="lazyload" data-src="${CONFIG.IMAGE_SMALL}/${this._restaurant.pictureId}" alt="${this._restaurant.name}">
          <span>${this._restaurant.city}</span>
        </div>
        <div class="card_text">
          <span>Rating ${this._restaurant.rating}</span>
          <a href='#/detail/${this._restaurant.id}'><h3>${this._restaurant.name}</h3></a>
          <p>${this._restaurant.description}</p>
        </div>
      </div>
    </article>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
