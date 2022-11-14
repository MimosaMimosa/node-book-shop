const { Router } = require('express');
const {
    index,
    destroy,
    show,
    update,
    store,
} = require('../../controller/admin/author');
const { updateRequest, storeRequest } = require('../../validator/author');
const router = Router();
const { uploadImage } = require('../../utils/upload');

router.get('/', index);
router.delete('/:id', destroy);
router.get('/:id', show);
router.post('/', storeRequest, uploadImage('upload.authors'), store);
router.post('/:id', updateRequest, uploadImage('upload.authors'), update);

module.exports = router;
