const { v4: uuidv4 } = require('uuid');

const contacts = [
  {
    id: uuidv4(),
    name: 'Giovanny',
    telefone: 87988261615,
  },
  {
    id: uuidv4(),
    name: 'Giovanny Gabriel',
    telefone: 12264564845,
  },
  {
    id: uuidv4(),
    name: 'jamdirey',
    telefone: 56498789751,
  },
];

class ContactRepository {
  findall() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactRepository();
