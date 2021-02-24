const Account = require('../models/account.model');

initRoute = router => {
  router.route(`/accounts`).get((req, res) => {
    Account.find()
      .then(accounts => res.json(accounts))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/accounts`).post((req, res) => {
    new Account(req.body).save()
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/cash`).post((req, res) => {
    const { debet, credit } = req.body;
    console.log(debet, credit)
    Account.findById('602d8064fef75931787855c6')
      .then(account => ({ ...account._doc, credit: account._doc.credit + +credit, debet: account._doc.debet + +debet }))
      .then(account => Account.findByIdAndUpdate('602d8064fef75931787855c6', account))
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/fond`).post((req, res) => {
    const { debet, credit } = req.body;
    Account.findById('602d7d31fef75931787855c5')
      .then(account => ({ ...account._doc, credit: account._doc.credit + +credit, debet: account._doc.debet + +debet }))
      .then(account => Account.findByIdAndUpdate('602d7d31fef75931787855c5', account))
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/current-account/:id`).post((req, res) => {
    const { id } = req.params;
    const { debet, credit } = req.body;
    console.log(debet, credit)
    Account.findOne({
      $and: [
        { depositId: id },
        { depositType: 'current' },
      ]
    })
      .then(account => ({ ...account._doc, credit: account._doc.credit + +credit, debet: account._doc.debet + +debet }))
      .then(account => Account.findOneAndUpdate({
        $and: [
          { depositId: id },
          { depositType: 'current' },
        ]
      }, account))
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/percent-account/:id`).post((req, res) => {
    const { id } = req.params;
    const { debet, credit } = req.body;
    console.log(debet, credit)
    Account.findOne({
      $and: [
        { depositId: id },
        { depositType: 'percent' },
      ]
    })
      .then(account => ({ ...account._doc, credit: account._doc.credit + +credit, debet: account._doc.debet + +debet }))
      .then(account => Account.findOneAndUpdate({
        $and: [
          { depositId: id },
          { depositType: 'percent' },
        ]
      }, account))
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/percent-account/:id`).get((req, res) => {
    const { id } = req.params;
    Account.findOne({
      $and: [
        { depositId: id },
        { depositType: 'percent' },
      ]
    })
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/current-account/:id`).get((req, res) => {
    const { id } = req.params;
    Account.findOne({
      $and: [
        { depositId: id },
        { depositType: 'current' },
      ]
    })
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/cash`).get((req, res) => {
    Account.findById('602d8064fef75931787855c6')
      .then(account => res.json(account))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  // router.route(`/client/:id`).get((req, res) => {
  //   Client.findById(req.params.id)
  //     .then(client => res.json(client))
  //     .catch(err => res.status(412).json(`Error occured: ${err}`));
  // });

  // router.route(`/client/:id`).delete((req, res) => {
  //   Client.findByIdAndDelete(req.params.id)
  //     .then(client => res.json(client))
  //     .catch(err => res.status(412).json(`Error occured: ${err}`));
  // });

  // router.route(`/client/:id`).put((req, res) => {
  //   Client.findByIdAndUpdate(req.params.id, req.body)
  //     .then(client => res.json(client))
  //     .catch(err => res.status(412).json(`Error occured: ${err}`));
  // });
};


module.exports = initRoute;