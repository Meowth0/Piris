const mongoose = require('mongoose');
const { GENDER, VALIDATION_SCHEMA, CITIES, CITIZENSHIPS, MARTIAL_STATUSES, DISABILITIES } = require('../constants');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: GENDER,
    required: true,
  },
  passportSeries: {
    type: String,
    validate: data => data.match(VALIDATION_SCHEMA.PASSPORT_SERIES),
    required: true,
  },
  passportNumber: {
    type: String,
    validate: data => data.match(VALIDATION_SCHEMA.PASSPORT_NUMBER),
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  identificationNumber: {
    type: String,
    validate: data => data.match(VALIDATION_SCHEMA.IDENTIFICATION_NUMBER),
    required: true,
  },
  residenceCity: {
    type: String,
    enum: CITIES,
    required: true,
  },
  residenceAddress: {
    type: String,
    required: true,
    
  },
  homePhone: {
    type: String,
    validate: data => (data || '').match(VALIDATION_SCHEMA.HOME_PHONE),
  },
  mobilePhone: {
    type: String,
    validate: data => (data || '').match(VALIDATION_SCHEMA.MOBILE_PHONE),
  },
  email: {
    type: String,
  },
  workPlace: {
    type: String,
  },
  position: {
    type: String,
  },
  maritalStatus: {
    type: String,
    enum: MARTIAL_STATUSES,
    required: true,
    default: MARTIAL_STATUSES[0],
  },
  citizenship: {
    type: String,
    enum: CITIZENSHIPS,
    required: true,
    default: CITIZENSHIPS[0],
  },
  disability: {
    type: String,
    enum: DISABILITIES,
    required: true,
    default: DISABILITIES[0],
  },
  pensioner: {
    type: Boolean,
    required: true,
    default: false,
  },
  income: {
    type: Number,
    validate: data => data.toString().match(VALIDATION_SCHEMA.MONEY),
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;