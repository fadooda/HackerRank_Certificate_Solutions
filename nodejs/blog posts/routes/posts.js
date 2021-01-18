const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.put('/:id', postsController.invalid)
        .patch('/:id', postsController.invalid)
        .delete('/:id', postsController.invalid)
        .get('/:id', postsController.getBlogPostById)
        .post('/', postsController.post)
        .get('/', postsController.getAll)

        
    


module.exports = router;
