const router = require('express').Router();
const initClientRoute = require('./routes/client.route');
const initAccountRoute = require('./routes/account.route');
const initDepositRoute = require('./routes/deposit.route');

initClientRoute(router);
initAccountRoute(router);
initDepositRoute(router);

module.exports = router;