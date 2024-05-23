import { Notyf } from 'notyf';
import API_ENDPOINTS from '../globals/api-endpoints';

const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top',
  },
});

class Restaurant {
  static async RestaurantList() {
    try {
      const response = await fetch(`${API_ENDPOINTS.HOME}`, {
        method: 'GET',
      });
      const responseJSON = await response.json();
      const { restaurants } = responseJSON;
      return restaurants;
    } catch (error) {
      console.log(error.message);
      return notyf.error(error.message);
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(`${API_ENDPOINTS.DETAIL(id)}`, {
        method: 'GET',
      });
      const responseJSON = await response.json();
      const { restaurant } = responseJSON;
      return restaurant;
    } catch (error) {
      console.log(error.message);
      return notyf.error(error.message);
    }
  }

  static async feedbackRestaurant(id, name, review) {
    try {
      const response = await fetch(`${API_ENDPOINTS.REVIEW}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, name, review,
        }),
      });

      const responseJSON = await response.json();
      console.log(responseJSON);
      const { message } = responseJSON;
      if (message !== 'success') {
        throw new Error('Error Server');
      }
      return notyf.success('Review created');
    } catch (error) {
      console.log(error.message);
      return notyf.error(error.message);
    }
  }
}

export default Restaurant;
