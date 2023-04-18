const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    //Plan:
    //find all spots
    //include Review so we can get aggregate data of avgRating
    //include SpotImage so we can get the preview image url
    const allSpots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    })

    let spotsList = [];

    allSpots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars
        })
        spot.avgRating = sum / spot.Reviews.length

        delete spot.Reviews
    })

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }

        delete spot.SpotImages
    })

    res.json(spotsList)
})

module.exports = router;
