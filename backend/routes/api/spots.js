const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

//helper function to validate the body of post request
//thoughts:
//do i need to check that strings are isAlpha and price isNumeric?
//does the .exists not need to be everywhere since only name and description have not null
//does lat and lng need to be a decimal WITH a decimal point aka whole numbers not allowed
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 1000 })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage("Review text is required"),
    handleValidationErrors
];


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

    return res.json({ Spots: normalizedSpots.filter((spot) => spot.ownerId === userId) })
});

// Get bookings for a Spot based on Spot ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id, {
        include: [{
            model: Booking, include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
        }]
    })

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    // If you're the owner, return more info
    if (currentUserId === spot.dataValues.ownerId) {
        let spotBookings = []
        spot.Bookings.forEach(booking => {
            spotBookings.push(booking.toJSON())
        })

        spotBookings.forEach(booking => {
            booking.startDate = booking.startDate.toISOString().slice(0, 10)
            booking.endDate = booking.endDate.toISOString().slice(0, 10)
        })

        return res.json({ Bookings: spotBookings })
    } else {
        // If not, only return id, startDate, endDate
        let spotBookings = []
        spot.Bookings.forEach(booking => {
            spotBookings.push({
                spotId: booking.spotId,
                startDate: booking.startDate.toISOString().slice(0, 10),
                endDate: booking.endDate.toISOString().slice(0, 10)
            })
        })

        return res.json({ Bookings: spotBookings })
    }
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const id = req.params.spotId;

    const spot = await Spot.findByPk(id, {
        include: [{
            model: Review,
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
        }]
    });

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    res.json({ Reviews: spot.Reviews })
})

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
    //errors object for query params
    let errorResult = { message: "Bad Request", errors: {} }

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    //pagination
    let pagination = {};

    if (!page || isNaN(page)) page = 1;
    if (!size || isNaN(size)) size = 20;
    if (page > 10) page = 10;
    if (size > 20) size = 20;
    if (page <= 0) {
        errorResult.errors.page = "Page must be greater than or equal to 1"
    }
    if (size <= 0) {
        errorResult.errors.size = "Size must be greater than or equal to 1"
    }

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    //search filters
    let where = {};
    if (minLat) {
        if (isNaN(minLat)) {
            errorResult.errors.minLat = "Minimum latitude is invalid"
        } else if (minLat > 90 || minLat < -90) {
            errorResult.errors.minLat = "Minimum latitude is invalid"
        } else {
            where.lat = { [Op.gte]: minLat }
        }
    }

    if (maxLat) {
        if (isNaN(maxLat)) {
            errorResult.errors.maxLat = "Maximum latitude is invalid"
        } else if (maxLat > 90 || maxLat < -90) {
            errorResult.errors.maxLat = "Maximum latitude is invalid"
        } else if (where.lat) {
            where.lat = { [Op.and]: [{ [Op.lte]: maxLat }, { [Op.gte]: minLat }] }
        } else {
            where.lat = { [Op.lte]: maxLat }
        }
    }

    if (minLng) {
        if (isNaN(minLng)) {
            errorResult.errors.minLng = "Minimum longitude is invalid"
        } else if (minLng > 180 || minLng < -180) {
            errorResult.errors.minLng = "Minimum longitude is invalid"
        } else {
            where.lng = { [Op.gte]: minLng }
        }
    }

    if (maxLng) {
        if (isNaN(maxLng)) {
            errorResult.errors.maxLng = "Maximum longitude is invalid"
        } else if (maxLng > 180 || maxLng < -180) {
            errorResult.errors.maxLng = "Maximum longitude is invalid"
        } else if (where.lng) {
            where.lng = { [Op.and]: [{ [Op.lte]: maxLng }, { [Op.gte]: minLng }] }
        } else {
            where.lng = { [Op.lte]: maxLng }
        }
    }

    if (minPrice) {
        if (isNaN(minPrice)) {
            errorResult.errors.minPrice = "Price must be a number"
        } else if (minPrice < 0) {
            errorResult.errors.minPrice = "Minimum price must be greater than or equal to 0"
        } else {
            where.price = { [Op.gte]: minPrice }
        }
    }

    if (maxPrice) {
        if (isNaN(maxPrice)) {
            errorResult.errors.maxPrice = "Price must be a number"
        } else if (maxPrice < 0) {
            errorResult.errors.maxPrice = "Maximum price must be greater than or equal to 0"
        } else if (where.price) {
            where.price = { [Op.and]: [{ [Op.lte]: maxPrice }, { [Op.gte]: minPrice }] }
        } else {
            where.price = { [Op.lte]: maxPrice }
        }
    }

    //if anything above has caused an error then return the error thing
    if (Object.keys(errorResult.errors).length) {
        return res.status(400).json(errorResult)
    }

    const allSpots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ],
        where,
        ...pagination,
    })

    const Spots = normalizeSpots(allSpots)

    return res.json({
        Spots,
        page: parseInt(page),
        size: parseInt(size),
    })
})


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;

    if (startDate > endDate) {
        return res.status(400).json({
            "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const addBookingSpot = await Spot.findByPk(spotId, {
        include: [{ model: Booking }]
    });

    // can't find spot with specified id
    if (!addBookingSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const ownerId = addBookingSpot.dataValues.ownerId;
    // authorization error flipped: owner cannot make booking of their own property
    if (ownerId === currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    // Booking conflict error
    for (const booking of addBookingSpot.Bookings) {
        const startDateISO = new Date(startDate).toISOString()
        const endDateISO = new Date(endDate).toISOString()
        const bookingStartDateISO = booking.dataValues.startDate.toISOString()
        const bookingEndDateISO = booking.dataValues.endDate.toISOString()
        let startDateConflict = false;
        let endDateConflict = false;

        if (startDateISO <= bookingEndDateISO && startDateISO >= bookingStartDateISO) {
            startDateConflict = true;
        }

        if (endDateISO <= bookingEndDateISO && endDateISO >= bookingStartDateISO) {
            endDateConflict = true
        }

        if (startDateConflict || endDateConflict) {
            const errors = {}
            if (startDateConflict) {
                errors.startDate = "Start date conflicts with an existing booking"
            }
            if (endDateConflict) {
                errors.endDate = "End date conflicts with an existing booking"
            }

            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors
            })
        }
    }


    const newBooking = await Booking.create({
        spotId: parseInt(spotId),
        userId: currentUserId,
        startDate,
        endDate
    })

    return res.json({
        id: newBooking.dataValues.id,
        spotId,
        userId: currentUserId,
        startDate,
        endDate,
        createdAt: newBooking.dataValues.createdAt,
        updatedAt: newBooking.dataValues.updatedAt
    })
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
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
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
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const ownerId = req.user.dataValues.id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(newSpot)
})

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const editedSpot = await Spot.findByPk(spotId);

    //can't find spot with specified id
    if (!editedSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    };

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
