import moment from 'moment';
import { DATE_FORMAT } from '../../../constants';

class ClientModel {
  id;

  name;

  surname;

  patronymic;

  birthday;

  gender;

  passportSeries;

  passportNumber;

  issuedBy;

  issueDate;

  identificationNumber;

  residenceCity;

  residenceAddress;

  homePhone;

  mobilePhone;

  email;

  workPlace;

  position;

  maritalStatus;

  citizenship;

  disability;

  pensioner;

  income;

  constructor(params) {
    this.id = params._id;
    this.name = params.name;
    this.surname = params.surname;
    this.patronymic = params.patronymic;
    this.birthday = params.birthday ? moment(params.birthday).format(DATE_FORMAT) : null;
    this.gender = params.gender;
    this.passportSeries = params.passportSeries;
    this.passportNumber = params.passportNumber;
    this.issuedBy = params.issuedBy;
    this.issueDate = params.issueDate ? moment(params.issueDate).format(DATE_FORMAT) : null;
    this.identificationNumber = params.identificationNumber;
    this.residenceCity = params.residenceCity;
    this.residenceAddress = params.residenceAddress;
    this.homePhone = params.homePhone;
    this.mobilePhone = params.mobilePhone;
    this.email = params.email;
    this.workPlace = params.workPlace;
    this.position = params.position;
    this.maritalStatus = params.maritalStatus;
    this.citizenship = params.citizenship;
    this.disability = params.disability;
    this.pensioner = Boolean(params.pensioner);
    this.income = Number(params.income);
  }

  getInstance = () => {
    const {
      id = '', name = '', surname = '', patronymic = '', birthday = new Date(), gender = '', passportSeries = '',
      passportNumber = '', issuedBy = '', issueDate = '', identificationNumber = '', residenceCity = '',
      residenceAddress = '', homePhone = '', mobilePhone = '', email = '', workPlace = '', position = '',
      maritalStatus = '', citizenship = '', disability = '', pensioner = '', income = '',
    } = this;
    return {
      id,
      name,
      surname,
      patronymic,
      birthday,
      gender,
      passportSeries,
      passportNumber,
      issuedBy,
      issueDate,
      identificationNumber,
      residenceCity,
      residenceAddress,
      homePhone,
      mobilePhone,
      email,
      workPlace,
      position,
      maritalStatus,
      citizenship,
      disability,
      pensioner,
      income,
    };
  };
}

export default ClientModel;
