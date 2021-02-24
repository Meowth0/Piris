const mongoose = require('mongoose');
const { ACCOUNT_TYPES } = require('../constants');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ACCOUNT_TYPES,
    required: true,
  },
  debet: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true
  },
  depositId: {
    type: String,
    required: false,
  },
  depositType: {
    type: String,
    required: false,
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;