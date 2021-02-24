import moment from 'moment';
import { DATE_FORMAT } from '../../../constants';

class AccountModel {
  id;

  depositType;

  contractNumber;

  startDate;

  endDate;

  money;

  percent;

  clientId;

  dayPassed;

  constructor(params) {
    this.id = params._id;
    this.depositType = params.depositType;
    this.contractNumber = params.contractNumber;
    this.startDate = moment(params.startDate).format(DATE_FORMAT);
    this.endDate = moment(params.endDate).format(DATE_FORMAT);
    this.money = params.money;
    this.percent = params.percent;
    this.clientId = params.clientId;
    this.dayPassed = params.dayPassed;
  }

  getInstance = () => {
    const {
      id = '', depositType = '', contractNumber = '', startDate = new Date(),
      endDate = new Date(), money = 0, percent = 0, clientId, dayPassed,
    } = this;
    return {
      id, depositType, contractNumber, startDate, endDate, money, percent, clientId, dayPassed,
    };
  };
}

export default AccountModel;
