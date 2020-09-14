import * as express from 'express';
import UserCtrl from './controllers/user';

function setRoutes(app): void {
  const router = express.Router();
  const userCtrl = new UserCtrl();
  
  // Users
  router.route('/user').post(userCtrl.insert);
  router.route('/login').post(userCtrl.login);
  router.route('/user').put(userCtrl.update);
  router.route('/user/:id').get(userCtrl.get);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
