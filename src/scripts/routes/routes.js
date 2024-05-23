import HOME from '../pages/home';
import FAVORITE from '../pages/favorite';
import DETAIL from '../pages/detail';

const routes = {
  '/': HOME, // default page
  '/favorite': FAVORITE,
  '/detail/:id': DETAIL,
};

export default routes;
