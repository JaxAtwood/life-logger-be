const express = require('express');

const Events = require('./events-model.js');

const nopass = require('../auth/authenticate-middleware');

const router = express.Router();

router.get('/',  nopass , (req, res) => {
    Events.find()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });

router.get('/:id', nopass , (req, res) => {
  const { id } = req.params;
  
    Events.findById(id)
    .then(event => {
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: 'Could not find event with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get event' });
    });
  });

router.post('/', nopass , (req, res) => {
    const eventData = req.body;
  
   Events.add(eventData)
    .then(newevent => {
      res.status(201).json(newevent);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new event' });
    });
  });

router.put('/:id', nopass , (req, res) => {
    const changes = req.body;
  
    Events.update(req.params.id,changes)
    .then(event => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Could not find event with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update event'});
    });
  });

  
router.delete('/:id', nopass , (req, res) => {
    const { id } = req.params;
  
    Events.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find event with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete event' });
    });
  });

 
  module.exports = router;
