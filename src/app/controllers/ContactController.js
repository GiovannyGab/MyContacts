const ContactRepository = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactRepository.findall();

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User Not Found' });
    }
    return res.json(contact);
  }

  async store(req, res) {

  }

  async update(req, res) {

  }

  async delete(req, res) {

  }
}

module.exports = new ContactController();
