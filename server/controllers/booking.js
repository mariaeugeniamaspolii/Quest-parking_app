const Booking = require("../models/Booking");

const populateFields = [
    {
        path: "user"
    },
    {
        path: "parking"
    },
    {
        path: "services"
    },
    {
        path: "vehicle"
    },
]

const buildBookingParams = (params) => ({
    address: {
        name: params.address.name,
        neighborhood: params.address.neighborhood,
        longitude: params.address.longitude,
        latitude: params.address.latitude,
    },
    user: params.user,
    parking: params.parking,
    cost: params.cost,
    schedule: {
        start: params.start,
        end: params.end,
    },
    state: params.state,
    services: params.services,
    vehicle: params.vehicle,
});

// Find all bookings
const findBookings = async (params) => {

    const query = {
        user: params.user ? params.user : { $exists: true },
        parking: params.parking ? params.parking : { $exists: true },
        state: params.state ? params.state : { $exists: true },
        vehicle: params.vehicle ? params.vehicle : { $exists: true },
    };
    const bookings = await Booking.find(query)
        .populate(populateFields)
        .exec();

    return bookings;
};

// Find booking by id
const findBookingById = async (bookingId) => {
    const booking = await Booking.findById(bookingId)
        .populate(populateFields)
        .exec();

    return booking;
};

// Create booking
const createBooking = async (params) => {
    const newBooking = new Booking(buildBookingParams(params));
    await newBooking.save();
    return newBooking;
};

// Update booking
const updateBooking = async (bookingId, params) => {
    const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        buildBookingParams(params), {
            new: true
        }
    );

    return updatedBooking;
};

// Delete booking
const deleteBooking = async (bookingId) => {
    const deletedInfo = await Booking.deleteOne({
        _id: bookingId
    });
    return deletedInfo;
};

module.exports = {
    findBookings,
    findBookingById,
    createBooking,
};