const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');

const router = express.Router();

const normalizeSpots = (spots) => {
    let spotsList = [];

    spots.forEach(spot => {
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

    return spotsList
}

router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId;

    const spot = await Spot.findByPk(id, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: Review },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
        ]
    })

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const JSONspot = spot.toJSON()

    const numReviews = spot.Reviews.length
    JSONspot.numReviews = numReviews
    let starRatingSum = 0;
    spot.Reviews.forEach(review => {
        starRatingSum += review.stars
    })
    JSONspot.avgStarRating = starRatingSum / numReviews
    delete JSONspot.Reviews

    return res.json(JSONspot)

})

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.dataValues.id

    const allSpots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    })

    const normalizedSpots = normalizeSpots(allSpots);

    return res.json(normalizedSpots.filter((spot) => spot.ownerId === userId))
})

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

    const normalizedSpots = normalizeSpots(allSpots)

    res.json(normalizedSpots)
})

module.exports = router;
