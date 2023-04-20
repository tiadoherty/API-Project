const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

router.delete('/:spotImageId', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const spotImageId = req.params.spotImageId;

    const spotImageToDelete = await SpotImage.findByPk(spotImageId, {
        include: [
            { model: Spot }
        ]
    })

    //can't find spot image with specified id
    if (!spotImageToDelete) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found"
        })
    }

    const ownerId = spotImageToDelete.Spot.dataValues.ownerId;
    //authorization error
    if (ownerId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    await spotImageToDelete.destroy();

    return res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
