const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // get all categories, include products in each category
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    // success
    res.status(200).json(catData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // get category by id
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // category id doesn't exist
    if (!catData) {
      res.status(404).json({ message: "Error: Category not found!" });
      return;
    }
    // success
    res.status(200).json(catData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    // update category by id
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // category id doesn't exist
    if (!catData[0]) {
      res.status(404).json({ message: "Error: Category not found!"});
      return;
    }
    // success
    res.status(200).json(catData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // category id doesn't exist
    if(!catData){
      res.status(404).json({ message: "Error: Category not found!" });
      return;
    }
    // success
    res.status(200).json(catData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
