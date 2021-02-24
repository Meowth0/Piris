import ACCOUNT_TYPE from '../constants/account-types';

class AccountModel {
  id;

  accountNumber;

  type;

  debet;

  credit;

  balance;

  constructor(params) {
    this.id = params._id;
    this.accountNumber = params.accountNumber;
    this.type = params.type;
    this.debet = params.debet;
    this.credit = params.credit;
    this.balance = params.type === ACCOUNT_TYPE.ACTIVE
      ? params.debet - params.credit : params.credit - params.debet;
  }

  getInstance = () => {
    const {
      id = '', accountNumber = '', type = ACCOUNT_TYPE.ACTIVE, debet = 0, credit = 0, balance = 0,
    } = this;
    return {
      id,
      accountNumber,
      type,
      debet,
      credit,
      balance,
    };
  };
}

export default AccountModel;
