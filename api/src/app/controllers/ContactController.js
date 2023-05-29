const ContactRepository = require('../Repositories/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactRepository.findall(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'contato não encontrado' });
    }
    return res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;
    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);
      if (contactExists) {
        return res.status(400).json({ error: 'o Email ja esta sendo usado' });
      }
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid id in category' });
    }
    if (!name) {
      return res.status(400).json({ error: 'insira um nome' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'insira um telefone para contato' });
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    return res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid id in category' });
    }
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    if (!name) {
      return res.status(400).json({ error: 'insira um nome' });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return res.status(400).json({ error: 'esse id nao existe' });
    }
    if (email) {
      const contactWithEmail = await ContactRepository.findByEmail(email);
      if (contactWithEmail && contactWithEmail.id !== id) {
        return res.status(400).json({ error: 'o Email ja esta sendo usado' });
      }
    }

    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    if (!contact) {
      return res.status(404).json({ error: 'contato não encontrado!' });
    }
    await ContactRepository.delete(id);
    res.status(204);
  }
}

module.exports = new ContactController();
