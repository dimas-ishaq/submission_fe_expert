Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Custom validity message is displayed when clicking the Send button with a required but empty name input', ({ I }) => {

  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });

  I.waitInUrl('/#/detail/', 5);
  I.seeInCurrentUrl('/#/detail/');

  I.seeElement('input');


  I.seeElement('textarea');
  I.seeElement('.btn');


  I.click('.btn');

  I.seeElement('input:invalid');
});

Scenario('Custom validity message is displayed when clicking the Send button with a required but empty message textarea', ({ I }) => {
  // Navigate to the detail page of the first restaurant
  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });


  I.waitInUrl('/#/detail/', 5);
  I.seeInCurrentUrl('/#/detail/');


  I.seeElement('input');


  I.seeElement('textarea');
  I.seeElement('.btn');

  I.fillField('input', 'Dimas Maulana Ishaq');


  I.click('.btn');

  // Check that the custom validity message is shown for the empty required fields
  I.seeElement('textarea:invalid');
});

Scenario('Toast Notification called when successfully or failed when creating feedback', ({ I }) => {
  // Navigate to the detail page of the first restaurant
  I.seeElement('restaurant-item');
  within(locate('restaurant-list restaurant-item').first(), () => {
    I.seeElement('.card_text a');
    I.click('.card_text a');
  });

  // Wait for the detail page to load
  I.waitInUrl('/#/detail/', 5);
  I.seeInCurrentUrl('/#/detail/');

  
  I.seeElement('input');

  
  I.seeElement('textarea');
  I.seeElement('.btn');

  I.fillField('input', 'Dimas Maulana Ishaq');
  I.fillField('textarea', 'Halo, Nama saya Dimas Maulana Ishaq, Ini adalah pengujian end2end testing untuk fitur feedback');

  I.click('.btn');
  I.wait(2)

  I.waitForElement('.notyf__toast')
  // Check that the custom validity message is shown for the empty required fields
});