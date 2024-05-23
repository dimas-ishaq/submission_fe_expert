import Restaurant from '../data/restaurants';
import UrlParser from '../routes/url-parser';
import LikeButtonInitiator from '../utils/like-button-initiator';

const DETAIL = {

  async render() {
    return `
    <div class="overlay">
    <div class="loader"></div>
  </div>
  <section class="content">
    <div class="detail" id="detail"></div>
    <div id="favorite_restaurant"></div>
    </section >
    
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
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetail = await Restaurant.detailRestaurant(url.id);
    const restaurantItemDetail = document.createElement('detail-restaurant');
    restaurantItemDetail.detail = restaurantDetail;
    const restaurantDetailContainer = document.querySelector('#detail');
    restaurantDetailContainer.appendChild(restaurantItemDetail);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#favorite_restaurant'),
      restaurant: {
        id: restaurantDetail.id,
        name: restaurantDetail.name,
        description: restaurantDetail.description,
        pictureId: restaurantDetail.pictureId,
        city: restaurantDetail.city,
        rating: restaurantDetail.rating,
      },
    });

    restaurantDetailContainer.addEventListener('feedback', async (event) => {
      const { id, feedback, name } = event.detail;
      try {
        const response = await Restaurant.feedbackRestaurant(id, name, feedback);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    });
    setTimeout(() => hideLoading(), 1000);
  },

};

export default DETAIL;
