import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './components/index';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const appBar = document.querySelector('app-bar');
const app = new App({
  button: appBar.shadowRoot.querySelector('#menu'),
  drawer: appBar.shadowRoot.querySelector('#mobile-menu'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  console.log('EVENT TRIGGER HASCHANGE');
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  const buttonSkipToContent = document.querySelector('.skip-to-content');
  const mainElement = document.querySelector('#mainContent');

  buttonSkipToContent.addEventListener('click', (event) => {
    event.preventDefault();
    mainElement.focus();
    mainElement.scrollIntoView({ behavior: 'smooth' });
  });
  buttonSkipToContent.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      mainElement.focus();
      mainElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
