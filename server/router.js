const router = require('express').Router();
const initClientRoute = require('./routes/client.route');

initClientRoute(router);

module.exports = router;