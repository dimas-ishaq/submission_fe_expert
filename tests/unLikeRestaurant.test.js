import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

/**
 * Test scenarios for the "Unliking A Restaurant" feature
 *
 * 1. should display unlike widget when the restaurant has been liked
 *    - When the restaurant has been liked, the "unlike" widget should be displayed.
 *
 * 2. should not display like widget when the restaurant has been liked
 *    - When the restaurant has been liked, the "like" widget should not be displayed.
 *
 * 3. should not throw error when user click unlike widget if the unliked restaurant is not in the list
 *    - No error should be thrown when the user clicks the "unlike" widget even if the unliked restaurant is not in the list of liked restaurants.
 */

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favorite_restaurant"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Hapus dulu restaurant dari daftar restaurant yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget batal menyukai restaurant
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});