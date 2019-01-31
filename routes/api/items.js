const express = require('express');
const router = express.Router();

// item model
const Item = require('../../models/Item');

// @route GET api/ItemSchema @desc Get all Items @access Public
router.get('/', (req, res) => {
  Item.find()
  .sort({date: -1 })
  .then(items => res.json(items));
});

// @route POST api/Items
// @desc POST Item @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(items => res.json(items));
});

// @route delete api/Items/_id
// @desc delete Item
// @access Public

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
})
module.exports = router;
