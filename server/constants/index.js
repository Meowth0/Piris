module.exports = {
  VALIDATION_SCHEMA: {
    ANY: /^$|^.$/,
    REQUIRED: /./,
    PASSPORT_SERIES: /[a-zA-Z]{2}/,
    PASSPORT_NUMBER: /[0-9]{7}/,
    IDENTIFICATION_NUMBER: /^[0-9]{7}[A-Z]{1}[0-9]{3}[A-Z]{2}[0-9]{1}$/,
    REQUIRED_TEXT: /[а-яА-Яa-zA-Z]+/,
    HOME_PHONE: /^$|^[0-9]{7}$/,
    MOBILE_PHONE: /^$|^(80|\+375)(33|29|44|25)[0-9]{7}$/,
    MONEY: /^[0-9]+(\.[0-9]+)*$/,
  },
  GENDER: ['male', 'female', 'other'],
  CITIES: [
    'minsk',
    'brest',
    'vitebsk',
    'grodno',
    'gomel',
    'mogilev',
  ],
  DISABILITIES: [
    'none',
    'first',
    'second',
    'third',
  ],
  CITIZENSHIPS: [
    'bel',
    'ukr',
    'rus',
  ],
  MARTIAL_STATUSES: [
    'married',
    'single',
  ],
  ACCOUNT_TYPES: [
    'active',
    'passive',
  ],
  DEPOSIT_TYPES: [
    'revocable',
    'irrevocable',
  ]
};
