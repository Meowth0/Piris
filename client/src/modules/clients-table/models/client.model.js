import moment from 'moment';
import { DATE_FORMAT } from '../../../constants';

class ClientModel {
  id;

  name;

  surname;

  patronymic;

  birthday;

  constructor(params) {
    this.id = params._id;
    this.name = params.name;
    this.surname = params.surname;
    this.patronymic = params.patronymic;
    this.birthday = params.birthday ? moment(params.birthday).format(DATE_FORMAT) : null;
  }

  getInstance = () => {
    const {
      id, name, surname, patronymic, birthday,
    } = this;
    return {
      id,
      name,
      surname,
      patronymic,
      birthday,
    };
  };
}

export default ClientModel;
