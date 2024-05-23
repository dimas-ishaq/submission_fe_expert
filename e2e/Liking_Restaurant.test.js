Feature('Liking Restaurant');

/**
 * Test scenarios for the "Liking Restaurant" feature
 *
 * 1. Like and Unlike the first restaurant item
 *    - Navigate to the homepage.
 *    - Ensure the presence of restaurant items.
 *    - Click on the first restaurant item to navigate to its detail page.
 *    - Verify the URL contains '/#/detail/'.
 *    - Ensure the presence of the "like this restaurant" button and click it.
 *    - Wait for the action to complete.
 *    - Navigate to the favorites page.
 *    - Ensure the liked restaurant item is present in the favorites list.
 *    - Click on the first restaurant item in the favorites list to navigate to its detail page.
 *    - Ensure the presence of the "unlike this restaurant" button and click it.
 *    - Wait for the action to complete.
 *    - Navigate to the favorites page again.
 *    - Ensure the restaurant item is no longer present in the favorites list.
 */


Before(({ I }) => {
  I.amOnPage('/');
});


Scenario('Like and Unlike the first restaurant item', ({ I }) => {

  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });

  I.waitInUrl('/#/detail/', 5);
  I.seeInCurrentUrl('/#/detail/');

  // Like the restaurant
  I.seeElement('[aria-label="like this restaurant"]');
  I.click('[aria-label="like this restaurant"]');
  I.wait(2);

  // Check the liked restaurant in the favorites page
  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });

  // Unlike the restaurant
  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('[aria-label="unlike this restaurant"]');

  // Ensure the restaurant is no longer in the favorites page
  I.amOnPage('/#/favorite');
  I.dontSeeElement('restaurant-item');
});