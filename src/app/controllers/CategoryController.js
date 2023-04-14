const CategoryRepository = require('../Repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoryRepository.findall();

    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.sendStatus(400).json({ error: 'insira um nome' });
    }

    const category = await CategoryRepository.create({ name });
    res.json(category);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada!' });
    }
    return res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
    } = req.body;
    const categoryExists = await CategoryRepository.findById(id);
    if (!categoryExists) {
      return res.sendStatus(400).json({ error: 'esse id nao existe' });
    }
    if (!name) {
      return res.sendStatus(400).json({ error: 'insira uma categoria!' });
    }

    const categoryWithName = await CategoryRepository.findbyName(name);
    if (categoryWithName && categoryWithName.id !== id) {
      return res.sendStatus(400).json({ error: 'a categoria em uso ja esta criada!' });
    }
    const category = await CategoryRepository.update(id, {
      name,
    });
    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada!' });
    }
    await CategoryRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
