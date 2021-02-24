const Deposit = require('../models/deposit.model');

initRoute = router => {
  // router.route(`/deposit`).get((req, res) => {
  //   Account.find()
  //     .then(accounts => res.json(accounts))
  //     .catch(err => res.status(412).json(`Error occured: ${err}`));
  // });

  router.route(`/deposit`).post((req, res) => {
    new Deposit(req.body).save()
      .then(deposit => res.json(deposit))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/client/:id/deposits`).get((req, res) => {
    Deposit.find({
      clientId: req.params.id,
    })
      .then(deposits => res.json(deposits))
      .catch(err => res.status(412).json(`Error`))
  });

  router.route(`/deposits/:id`).get((req, res) => {
    Deposit.findById(req.params.id)
      .then(deposit => res.json(deposit))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });
};


module.exports = initRoute;