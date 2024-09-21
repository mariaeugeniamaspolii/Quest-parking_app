const Rating = require("../models/Rating");

const populateFields = [
    {
        path: "booking"
    },
];

const buildRatingParams = (params) => ({

    user: params.user,
    parking: params.parking,
    booking: params.booking,
    date: params.date,
    time: params.time,
    rate: params.rate,
    text: params.text,
});

// Find all ratings
const findRatings = async (params) => {

    const query = {
        owner: params.owner ? params.owner : { $exists: true },
        date: params.date ?{ $gte:params.date }: { $exists: true },
    }

    const ratings = await Rating.find(query)
        .populate(populateFields)
        .exec();

    return ratings;
};

// Find rating by id
const findRatingById = async (ratingId) => {
    const rating = await Rating.findById(ratingId)
        .populate(populateFields)
        .exec();

    return rating;
};

// Create rating
const createRating = async (params) => {
    const newRating = new Rating(buildRatingParams(params));
    await newRating.save();
    return newRating;
};

module.exports = {
    findRatings,
    findRatingById,
    createRating,
};