import CONFIG from '../globals/config';

class DetailRestaurant extends HTMLElement {
  _style = null;

  _shadowRoot = null;

  _detail = {
    id: null,
    name: null,
    description: null,
    city: null,
    address: null,
    pictureId: null,
    categories: null,
    menus: null,
    rating: null,
    customerReviews: null,

  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin:0;
      padding:0;
    }

    .detail_restaurant{
      display: flex;
      flex-direction: column;
      max-width: 1080px;
      padding: 0px 20px;
    }
    .detail_restaurant img{
      object-fit: cover;
      max-height: 480px;
      width: 100%;
    }
    .detail_restaurant h2{
      font-size: 2.6rem;
    }
    .detail_restaurant .menu_restaurant{
      display: flex;
      flex-direction: column;
    }
    .detail_restaurant .menu_restaurant .customer_review {
      width:100%
    }

    .detail_restaurant .customer_review #reviewsContainer .review_item{
      border-bottom: 1px solid;
      padding: 5px 20px;
      margin: 10px 0px;
    }
    form{
      width:100%
      display: flex;
      flex-direction: column;
    }
    form textarea{
      width: 100%;
      padding: 10px 0px;
      margin: 0px;
      text-transform: capitalize:
    }
    form input{
      width:100%;
      padding: 15px 0px !important;
      margin-bottom: 10px;
      text-transform: capitalize:

    }
    .btn{
      padding: 15px 30px;
      background-color: #333;
      color:#fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-weight:600;
     
    }
      
    
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set detail(value) {
    this._detail = value;
  }

  get detail() {
    return this._detail;
  }

  customValidity = (event, message) => {
    event.target.setCustomValidity('');
    if (!event.target.validity.valid) {
      event.target.setCustomValidity(message);
    }
  };

  connectedCallback() {
    this.render();
    const form = this._shadowRoot.querySelector('form');
    const name = this._shadowRoot.querySelector('input');
    const feedback = this._shadowRoot.querySelector('textarea');
    name.addEventListener('invalid', (event) => {
      this.customValidity(event, ' Name required');
    });
    feedback.addEventListener('invalid', (event) => {
      this.customValidity(event, 'Reviews must be filled in');
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitFeedback(this._detail.id);
    });
    form.reset();
  }

  submitFeedback(id) {
    const name = this._shadowRoot.querySelector('input').value;
    const feedback = this._shadowRoot.querySelector('textarea').value;
    this.dispatchEvent(
      new CustomEvent('feedback', {
        detail: { id, feedback, name },
        bubbles: true,
      }),
    );
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="detail_restaurant" id="${this._detail.id}">
      <img src="${CONFIG.IMAGE_LARGE}/${this._detail.pictureId}" alt="${this._detail.name}">
      <h2>${this._detail.name}</h2>
      <p>Address: ${this._detail.address}</p>
      <p>City: ${this._detail.city}</p>
      <p>Description: ${this._detail.description}</p>
      <p>Categories: ${this._detail.categories.map((category) => category.name).join(', ')}</p>
    <div class="menu_restaurant">
      <div class="foods">
        <h3>Foods</h3>
        <p> ${this._detail.menus.foods.map((food) => food.name).join(', ')}</p>
      </div>
      <div class="drinks">
        <h3>Drinks</h3>
        <p> ${this._detail.menus.drinks.map((drink) => drink.name).join(', ')}</p>
      </div>
      </div>
      <div className="give_review">
      <form>
      <h3>Give Us Your Feedback</h3>
      <input type="text" placeholder="Your Name" required>
       <textarea type="text" cols="5" rows="8" required placeholder="Give Us Your Best Review"></textarea>
      <button type="submit" class="btn">Send</button>
      </form>
      </div>
      <div class="customer_review">
      <h3>Customer Reviews</h3>
      <div id="reviewsContainer">
      ${this._detail.customerReviews.map((user) => (
    `<div class="review_item">
            <p>${user.name}</p>
            <p>${user.review}</p>
            <small>${user.date}</small>
          </div>`
  )).join('')}
  </div>
      </div>
  </div>
    
    `;
  }
}

customElements.define('detail-restaurant', DetailRestaurant);
