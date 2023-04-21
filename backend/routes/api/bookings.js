const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.dataValues.id;

    const allBookings = await Booking.findAll({
        include: [
            { model: Spot, include: [{ model: SpotImage }] }
        ]
    })

    const bookingsList = [];
    allBookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    })

    bookingsList.forEach(booking => {
        const spot = booking.Spot
        delete spot.createdAt
        delete spot.updatedAt
        delete spot.description
        const previewImage = spot.SpotImages.find(spotImage => spotImage.preview === true)
        spot.previewImage = previewImage.url
        delete spot.SpotImages
    })

    res.json({ Bookings: bookingsList.filter(booking => booking.userId === userId) })
})

//Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body;

    const editedBooking = await Booking.findByPk(bookingId);

    // Can't find spot with specified id
    if (!editedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }

    // Body validation errors
    if (endDate < startDate) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    const userId = editedBooking.dataValues.userId;
    // Authorization error
    if (userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    // Can't edit a booking that's past the end date
    const bookingEndDate = editedBooking.dataValues.endDate.toISOString();
    const currentDate = new Date().toISOString();
    if (bookingEndDate < currentDate) {
        return res.status(403).json({
            "message": "Past bookings can't be modified"
        })
    }

    const spotsOtherBookings = await Booking.findAll({
        where: { spotId: editedBooking.dataValues.spotId }
    })

    // Booking conflict
    for (const booking of spotsOtherBookings) {
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


    // Edit the booking
    editedBooking.set({ startDate, endDate });
    await editedBooking.save();

    return res.json({
        id: editedBooking.dataValues.id,
        spotId: editedBooking.dataValues.spotId,
        userId: editedBooking.dataValues.userId,
        startDate: editedBooking.dataValues.startDate.toISOString().slice(0, 10),
        endDate: editedBooking.dataValues.endDate.toISOString().slice(0, 10),
        createdAt: editedBooking.dataValues.createdAt,
        updatedAt: editedBooking.dataValues.updatedAt
    })
})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const currentUserId = req.user.dataValues.id;
    const bookingId = req.params.bookingId;

    const bookingToDelete = await Booking.findByPk(bookingId);

    //can't find booking with specified id
    if (!bookingToDelete) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }

    const userId = bookingToDelete.dataValues.userId;
    //authorization error
    if (userId !== currentUserId) {
        return res.status(403).json({
            "message": "Forbidden"
        })
    };

    //Bookings that have been started can't be deleted aka cannot delete a booking whose start date is in the past
    //note: all seed data in bookings is in the past, so need to add a booking in the future to be able to test delete
    // console.log(bookingToDelete)
    const bookingStartDate = bookingToDelete.dataValues.startDate.toISOString();
    const currentDate = new Date().toISOString();
    if (bookingStartDate <= currentDate) {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted"
        })
    }

    await bookingToDelete.destroy();

    return res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
