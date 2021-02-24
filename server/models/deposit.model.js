const mongoose = require('mongoose');
const { DEPOSIT_TYPES } = require('../constants');

const Schema = mongoose.Schema;

const depositSchema = new Schema({
  depositType: {
    type: String,
    enum: DEPOSIT_TYPES,
    required: true,
  },
  contractNumber: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true
  },
  money: {
    type: Number,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  dayPassed: {
    type: Number,
    required: true
  },
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;