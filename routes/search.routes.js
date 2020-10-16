/*
    Path: /search
*/
const { Router } = require('express');
const path = require('path');

const {
    generalSearch,
    collectionSearch
} = require('../controllers/search.controllers');

const router = Router();

router.get('/:item', generalSearch);
router.get('/collections/:collection/:item', collectionSearch)

module.exports = router;