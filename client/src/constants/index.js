export const PAGES = {
  CLIENT_LIST: '/',
  CLIENT_FORM: '/client-form',
  ACCOUNTS: '/accounts',
  DEPOSITS: '/deposits',
};

export const DATE_FORMAT = 'MM/DD/yyyy';

export const VALIDATION_SCHEMA = {
  ANY: /.*/,
  REQUIRED: /./,
  PASSPORT_SERIES: /[a-zA-Z]{2}/,
  PASSPORT_NUMBER: /[0-9]{7}/,
  IDENTIFICATION_NUMBER: /^[0-9]{7}[A-Z]{1}[0-9]{3}[A-Z]{2}[0-9]{1}$/,
  REQUIRED_TEXT: /[а-яА-Яa-zA-Z]+/,
  HOME_PHONE: /^$|^[0-9]{7}$/,
  MOBILE_PHONE: /^$|^(80|\+375)(33|29|44|25)[0-9]{7}$/,
  MONEY: /^[0-9]+(\.[0-9]+)*$/,
  REQUIRED_NUMBER: /^\d+$/,
  REQUIRED_ACCOUNT_NUMBER: /^\d{13}$/,
};

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

export const CITIES = [
  {
    id: 'minsk',
    value: 'Minsk',
  },
  {
    id: 'brest',
    value: 'Brest',
  },
  {
    id: 'vitebsk',
    value: 'Vitebsk',
  },
  {
    id: 'grodno',
    value: 'Grodno',
  },
  {
    id: 'gomel',
    value: 'Gomel',
  },
  {
    id: 'mogilev',
    value: 'Mogilev',
  },
];

export const DISABILITIES = [
  {
    id: 'none',
    value: 'None',
  },
  {
    id: 'first',
    value: 'First degree disability',
  },
  {
    id: 'second',
    value: 'Second degree disability',
  },
  {
    id: 'third',
    value: 'Third degree disability',
  },
];

export const CITIZENSHIPS = [
  {
    id: 'bel',
    value: 'Belarus',
  },
  {
    id: 'ukr',
    value: 'Ukraine',
  },
  {
    id: 'rus',
    value: 'Russia',
  },
];

export const MARTIAL_STATUSES = [
  {
    id: 'married',
    value: 'Married',
  },
  {
    id: 'single',
    value: 'Single',
  },
];

export const ACCOUNT_TYPES = [
  {
    id: 'active',
    value: 'Active',
  },
  {
    id: 'passive',
    value: 'Passive',
  },
];

export const DEPOSIT_TYPES = [
  {
    id: 'revocable',
    value: 'Revocable',
  },
  {
    id: 'irrevocable',
    value: 'Irrevocable',
  },
];
