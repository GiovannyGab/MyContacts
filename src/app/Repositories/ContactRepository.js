const { v4: uuidv4 } = require('uuid');

const db = require('../../database/index');

let contacts = [
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
  async findall() {
    const rows = await db.query('SELECT * FROM CONTACTS');
    return rows;
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_Id,
  }) {
    const [row] = await db.query(`INSERT INTO contacts(name,email,phone,category_id)
    VALUES($1,$2,$3,$4)
    RETURNING *
    `, [name, email, phone, category_Id]);
    return row;
  }

  update(id, {
    name, email, phone, category_Id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_Id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactRepository();
