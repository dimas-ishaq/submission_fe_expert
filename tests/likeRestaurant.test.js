import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";


/**
 * Test scenarios for "Liking A Restaurant" feature
 *
 * 1. should show the like button when the restaurant has not been liked before
 *    - The like button should be displayed when the restaurant has not been liked before.
 *
 * 2. should be able to like the restaurant
 *    - The user should be able to like the restaurant.
 *    - After pressing the like button, the restaurant with the given ID should be added to the list of liked restaurants.
 *
 * 3. should not show the unlike button when the restaurant has not been liked before
 *    - The unlike button should not be displayed when the restaurant has not been liked before.
 *
 * 4. should not add a restaurant again when its already liked
 *    - The restaurant should not be added again to the list of liked restaurants if it is already liked.
 *    - After pressing the like button for a restaurant that is already in the list, the list of liked restaurants should not contain duplicates.
 *
 * 5. should not add a restaurant when it has no id
 *    - The restaurant should not be added to the list of liked restaurants if it does not have an ID.
 *    - After pressing the like button for a restaurant without an ID, the list of liked restaurants should remain empty.
 */

describe('Liking A Restaurant', () => {

  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favorite_restaurant"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should be able to like the restaurant', async () => {

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol suka restaurant
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});