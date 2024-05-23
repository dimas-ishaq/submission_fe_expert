import Restaurant from '../data/restaurants';

const HOME = {

  async render() {
    return `
    <div class="overlay">
    <div class="loader"></div>
  </div>
    <jumbotron-bar></jumbotron-bar>
    <section class="content">
    <h2 class="content_title">Explore Restaurant</h2>
    <restaurant-list></restaurant-list>
    </section>
    `;
  },

  async afterRender() {
    const loaderElement = document.querySelector('.overlay');
    const showLoading = () => {
      loaderElement.classList.add('show');
    };
    const hideLoading = () => {
      loaderElement.classList.remove('show');
    };
    showLoading();
    const restaurantList = await Restaurant.RestaurantList();
    const restaurantListElement = restaurantList.map((item) => {
      const restaurantItem = document.createElement('restaurant-item');
      restaurantItem.restaurant = item;
      return restaurantItem;
    });
    const restaurantContainer = document.querySelector('restaurant-list');
    restaurantContainer.append(...restaurantListElement);
    setTimeout(() => hideLoading(), 1000);
  },

};

export default HOME;
