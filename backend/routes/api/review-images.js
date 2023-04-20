const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');
const router = express.Router();

router.delete('/:reviewImageId', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const reviewImageId = req.params.reviewImageId;

    const reviewImageToDelete = await ReviewImage.findByPk(reviewImageId, {
        include: [
            { model: Review }
        ]
    })

    //cant find review image with specified id
    if (!reviewImageToDelete) {
        return res.status(404).json({
            "message": "Review Image couldn't be found"
        })
    }

    const userId = reviewImageToDelete.Review.dataValues.userId;
    //authorization error
    if (userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    await reviewImageToDelete.destroy();

    return res.json({
        message: 'Successfully deleted'
    })
})


module.exports = router;
