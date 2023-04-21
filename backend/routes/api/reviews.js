const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
]

//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.dataValues.id;

    const allReviews = await Review.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, include: [{ model: SpotImage }] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    const reviewsList = []

    allReviews.forEach(review => {
        reviewsList.push(review.toJSON())
    })

    reviewsList.forEach(review => {
        const spot = review.Spot
        delete spot.createdAt
        delete spot.updatedAt
        delete spot.description
        const previewImage = spot.SpotImages.find(spotImage => spotImage.preview === true)
        spot.previewImage = previewImage.url
        delete spot.SpotImages
    })

    res.json({ Reviews: reviewsList.filter((review) => review.userId === userId) })
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const reviewId = req.params.reviewId;
    const { url } = req.body;

    const addImageReview = await Review.findByPk(reviewId, {
        include: [{ model: ReviewImage }]
    });

    //can't find review with specified id
    if (!addImageReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }

    //too many images already
    // console.log(addImageReview.ReviewImages.length)
    const numReviewImages = addImageReview.ReviewImages.length;
    if (numReviewImages >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached"
        })
    };

    const userId = addImageReview.dataValues.userId;
    //authorization error
    if (userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    const newImage = await ReviewImage.create({
        reviewId: parseInt(reviewId),
        url
    });

    const newImageId = newImage.dataValues.id;

    return res.json({
        id: newImageId,
        url
    })
})

//Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;

    const editedReview = await Review.findByPk(reviewId);

    //can't find review with specified id
    if (!editedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }

    const userId = editedReview.dataValues.userId;
    //authorization error
    if (userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    // edit the review
    editedReview.set({ review, stars });
    await editedReview.save();

    return res.json(editedReview)
});

//Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const reviewId = req.params.reviewId;

    const reviewToDelete = await Review.findByPk(reviewId);

    //can't find review with specified id
    if (!reviewToDelete) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }

    const userId = reviewToDelete.dataValues.userId;
    //authorization error
    if (userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    await reviewToDelete.destroy();

    return res.json({
        message: 'Successfully deleted'
    })
})


module.exports = router;
