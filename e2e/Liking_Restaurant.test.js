Feature('Liking Restaurant');

/**
 * Test scenarios for the "Liking Restaurant" feature
 *
 * 1. Liked first restaurant-item
 *    - Navigate to the homepage.
 *    - Ensure the presence of restaurant items.
 *    - Click on the first restaurant item to navigate to its detail page.
 *    - Verify the URL contains '/#/detail/'.
 *    - Ensure the presence of the "like this restaurant" button and click it.
 *    - Wait for the action to complete.
 *    - Navigate to the favorites page.
 *    - Ensure the liked restaurant item is present in the favorites list.
 *
 * 2. Unliked first restaurant-item
 *    - Navigate to the homepage.
 *    - Ensure the presence of restaurant items.
 *    - Click on the first restaurant item to navigate to its detail page.
 *    - Verify the URL contains '/#/detail/'.
 *    - Ensure the presence of the "like this restaurant" button and click it.
 *    - Wait for the action to complete.
 *    - Ensure the presence of the "unlike this restaurant" button and click it.
 *    - Navigate to the favorites page.
 *    - Ensure the restaurant item is not present in the favorites list.
 */

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Liked first restaurant-item', ({ I }) => {

  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });


  I.waitInUrl('/#/detail/', 5);
  I.seeInCurrentUrl('/#/detail/');


  I.seeElement('[aria-label="like this restaurant"]');
  I.click('[aria-label="like this restaurant"]');

  I.wait(2);


  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');

});

Scenario('Unliked first restaurant-item', ({ I }) => {

  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });


  I.waitInUrl('/#/detail/', 5);
  I.seeInCurrentUrl('/#/detail/');


  I.seeElement('[aria-label="like this restaurant"]');
  I.click('[aria-label="like this restaurant"]');
  I.wait(2)


  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('[aria-label="unlike this restaurant"]');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('restaurant-item');


});