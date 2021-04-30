const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // get all tags including all products with each tag
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    // success
    res.status(200).json(tagData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // get tag by id, include all products that have the tag
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // tag id doesn't exist
    if (!tagData) {
      res.status(404).json({ message: "Error: Tag not found!" });
      return;
    }
    // success
    res.status(200).json(tagData);
  // database error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  
  try{
    // create a new tag
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // tag doesn't exist
    if (!tagData[0]) {
      res.status(404).json({ message: "Error: Tag not found!"});
      return;
    }
    // success
    res.status(200).json(tagData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // tag doesn't exist
    if(!tagData){
      res.status(404).json({ message: "Error: Tag not found!" });
      return;
    }
    // success
    res.status(200).json(tagData);
  // db error
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
