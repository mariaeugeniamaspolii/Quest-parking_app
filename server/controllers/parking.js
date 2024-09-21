const { addToObject } = require("../utils/object")
const Parking = require("../models/Parking");

const populateFields = [
    {path: "owner"},
    {path: "bookings"},
    {path: "services"},
    {path: "rating"},
];

const buildParkingParams = (params) => ({
    _id: params._id,
    name: params.name,
    address: {
        name: params.address.name,
        neighborhood: params.address.neighborhood,
        longitude: params.address.longitude,
        latitude: params.address.latitude,
    },
    hourPrice: params.hourPrice,
    dayPrice: params.dayPrice,
    monthPrice: params.monthPrice,
    rating: params.rating,
    rank: params.rank,
    dimensions: {
        length: params.dimensions.length,
        width: params.dimensions.width,
        height: params.dimensions.height,
    },
    services: params.services,
    images: params.images,
    avatar: params.avatar,
    owner: params.owner,
    bookings: params.bookings,
    slots: params.slots,
    // hours: {
    //     monday: {
    //         opening: params.hours.monday.opening,
    //         closing: params.hours.monday.closing,
    //     },
    //     tuesday: {
    //         opening: params.hours.tuesday.opening,
    //         closing: params.hours.tuesday.closing,
    //     },
    //     wednesday: {
    //         opening: params.hours.wednesday.opening,
    //         closing: params.hours.wednesday.closing,
    //     },
    //     thursday: {
    //         opening: params.hours.thursday.opening,
    //         closing: params.hours.thursday.closing,
    //     },
    //     friday: {
    //         opening: params.hours.friday.opening,
    //         closing: params.hours.friday.closing,
    //     },
    //     saturday: {
    //         opening: params.hours.saturday.opening,
    //         closing: params.hours.saturday.closing,
    //     },
    //     sunday: {
    //         opening: params.hours.sunday.opening,
    //         closing: params.hours.sunday.closing,
    //     },
    // }
});

// Find all parkings
const findParkings = async (params = {}) => {

    const query = {}
    if (params.name) addToObject(query, "name", { $regex: new RegExp(params.name, 'i') });
        // name: params.name ? { $regex: new RegExp(params.name, 'i') } : { $exists: true },
        // nameAddress: params.address?.name ? { $regex: new RegExp(params.address.name, 'i') } : { $exists: true },
        // neighborhood: params.address?.neighborhood ? { $regex: new RegExp(params.address.neighborhood, 'i') } : { $exists: true },
        // minPrice: params.price ? { $gte: params.price } : { $exists: true },
        // maxPrice: params.price ? { $lte: params.price } : { $exists: true },
        // rank: params.rank ? { $gte: params.rank } : { $exists: true },
        // services: params.services ? params.services : { $exists: true },
        // monOpening: params.hours.monday.opening ? params.hours.monday.opening : { $exists: true },
        // monClosing: params.hours.monday.closing ? params.hours.monday.closing : { $exists: true },
        // tueOpening: params.hours.tuesday.opening ? params.hours.tuesday.opening : { $exists: true },
        // tueClosing: params.hours.tuesday.closing ? params.hours.tuesday.closing : { $exists: true },
        // wedOpening: params.hours.wednesday.opening ? params.hours.wednesday.opening : { $exists: true },
        // wedClosing: params.hours.wednesday.closing ? params.hours.wednesday.closing : { $exists: true },
        // thuOpening: params.hours.thursday.opening ? params.hours.thursday.opening : { $exists: true },
        // thuClosing: params.hours.thursday.closing ? params.hours.thursday.closing : { $exists: true },
        // friOpening: params.hours.friday.opening ? params.hours.friday.opening : { $exists: true },
        // friClosing: params.hours.friday.closing ? params.hours.friday.closing : { $exists: true },
        // satOpening: params.hours.saturday.opening ? params.hours.saturday.opening : { $exists: true },
        // satClosing: params.hours.saturday.closing ? params.hours.saturday.closing : { $exists: true },
        // sunOpening: params.hours.sunday.opening ? params.hours.sunday.opening : { $exists: true },
        // sunClosing: params.hours.sunday.closing ? params.hours.sunday.closing : { $exists: true },
        
        // TODO: ADDRESS
        // const query = {}
        // if (params.date) addToObject(query, "date", { $eq: params.date });
        // if (params.name) addToObject(query, "name", { $regex: params.name });
        
        // const addressQuery = {};
        // if (params.address.name) addToObject(addressQuery, "name", { $regex: params.address.name });
        // if (params.address.neightbourhood)
        //   addToObject(addressQuery, "neightbourhood", {
        //     $regex: params.address.neightbourhood,
        //   });
        
        // if (params.address) addToObject(query, "address", addressQuery);
        
        
        // {
        //   date: {$eq...},
        //   name: {$regex...},
        //   address: {
        //     name: {$regex...}
        //     neigh: {$regex...}
        //   }
        // }

    const parkings = await Parking.find(query)
        .populate(populateFields)
        .exec();

    return parkings;
};

// Find parking by id
const findParkingById = async (parkingId) => {
    const parking = await Parking.findById(parkingId)
        .populate(populateFields)
        .exec();

    return parking;
};

// Create parking
const createParking = async (params) => {
    // TODO fetch a la api que modifica la dirección
    const newParking = new Parking(buildParkingParams(params));
    await newParking.save();
    return newParking;
};

// Update parking
const updateParking = async (parkingId, params) => {
    const updatedParking = await Parking.findByIdAndUpdate(
        parkingId,
        buildParkingParams(params), {
            new: true
        }
    );

    return updatedParking;
};

// Delete parking
const deleteParking = async (parkingId) => {
    const deletedInfo = await Parking.deleteOne({
        _id: parkingId
    });
    return deletedInfo;
};

module.exports = {
    findParkings,
    findParkingById,
    createParking,
    updateParking,
    deleteParking,
};