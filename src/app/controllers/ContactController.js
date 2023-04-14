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
      return res.status(404).json({ error: 'contato não encontrado' });
    }
    return res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_Id,
    } = req.body;

    const contactExists = await ContactRepository.findByEmail(email);
    if (!name) {
      return res.sendStatus(400).json({ error: 'insira um nome' });
    }
    if (!phone) {
      return res.sendStatus(400).json({ error: 'insira um telefone para contato' });
    }
    if (contactExists) {
      return res.sendStatus(400).json({ error: 'o Email ja esta sendo usado' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_Id,
    });
    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_Id,
    } = req.body;
    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return res.sendStatus(400).json({ error: 'esse id nao existe' });
    }
    if (!name) {
      return res.sendStatus(400).json({ error: 'insira um nome' });
    }

    const contactWithEmail = await ContactRepository.findByEmail(email);
    if (contactWithEmail && contactWithEmail.id !== id) {
      return res.sendStatus(400).json({ error: 'o Email ja esta sendo usado' });
    }
    const contact = await ContactRepository.update(id, {
      name, email, phone, category_Id,
    });
    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'contato não encontrado!' });
    }
    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
