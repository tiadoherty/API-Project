const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//helper function to validate the body of post request
//thoughts:
//do i need to check that strings are isAlpha and price isNumeric?
//does the .exists not need to be everywhere since only name and description have not null
//does lat and lng need to be a decimal WITH a decimal point aka whole numbers not allowed
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .isDecimal()
        .withMessage("Latitude is not valid"),
    check('lng')
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    handleValidationErrors
]

//helper function to get avgRatings and previewImage
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

// Get all Spots owned by the Current User
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
});

//Get details for a Spot from an id
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

//Get all Spots
router.get('/', async (req, res) => {
    //Plan:
    //find all spots
    //include Review so we can get avgRating
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

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const addImageSpot = await Spot.findByPk(spotId);

    //can't find spot with specified id
    if (!addImageSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const ownerId = addImageSpot.dataValues.ownerId;
    //authorization error
    if (ownerId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    const newImage = await SpotImage.create({
        spotId: parseInt(spotId),
        url,
        preview
    });

    // console.log(newImage)
    const newImageId = newImage.dataValues.id;

    return res.json({
        id: newImageId,
        url,
        preview
    })
})

// Create a review for a Spot based on the Spot's ID
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.dataValues.id;
    const { review, stars } = req.body;

    const addReviewSpot = await Spot.findByPk(spotId);

    // can't find spot with specified id
    if (!addReviewSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    // Check if user has already reviewed this spot
    const reviews = await Review.findAll({
        where: { userId, spotId }
    })

    if (reviews.length > 0) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }

    // Create review
    const newReview = await Review.create({
        userId,
        spotId: parseInt(spotId),
        review,
        stars
    })

    res.status(201).json(newReview)
})

//Create a Spot
router.post('/', validateSpot, requireAuth, async (req, res) => {
    const ownerId = req.user.dataValues.id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot)
})

//Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const editedSpot = await Spot.findByPk(spotId);
    // console.log('owner id from spot', editedSpot.dataValues.ownerId)
    // console.log('current user id', currentUserId)

    //can't find spot with specified id
    if (!editedSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    const ownerId = editedSpot.dataValues.ownerId;
    //authorization error
    if (ownerId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    editedSpot.set({ address, city, state, country, lat, lng, name, description, price });
    await editedSpot.save();

    return res.json(editedSpot)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const spotId = req.params.spotId;

    const spotToDelete = await Spot.findByPk(spotId);
    if (!spotToDelete) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const ownerId = spotToDelete.dataValues.ownerId
    if (currentUserId !== ownerId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    await spotToDelete.destroy();

    return res.json({
        message: 'Successfully deleted'
    })  
})

module.exports = router;
