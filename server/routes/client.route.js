const Client = require('../models/client.model');

initRoute = router => {
  router.route(`/clients`).get((req, res) => {
    Client.find()
      .then(clients => res.json(clients))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/client`).post((req, res) => {
    Client.findOne({
      $or: [
        {
          $and: [
            { passportSeries: req.body.passportSeries },
            { passportNumber: req.body.passportNumber },
          ]
        },
        { identificationNumber: req.body.identificationNumber }
      ]
    })
      .then(doc => {
        if (doc) {
          return res.status(409).json('Current client already exists. Please, try again');
        }
        new Client(req.body).save()
          .then(client => res.json(client))
          .catch(err => res.status(412).json(`Error occured: ${err}`));
      })
  });

  router.route(`/client/:id`).get((req, res) => {
    Client.findById(req.params.id)
      .then(client => res.json(client))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/client/:id`).delete((req, res) => {
    Client.findByIdAndDelete(req.params.id)
      .then(client => res.json(client))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });

  router.route(`/client/:id`).put((req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body)
      .then(client => res.json(client))
      .catch(err => res.status(412).json(`Error occured: ${err}`));
  });
};


module.exports = initRoute;