const Vehicle = require("../models/Vehicle");

const populateFields = [{
    path: "owner",
    // select: ["name", "email"] // en estos casos traernos todo
}, ];

const buildVehicleParams = (params) => ({
    alias: params.alias,
    color: params.color,
    model: params.model,
    plate: params.plate,
    brand: params.brand,
    dimensions: params.dimensions,
    owner: params.owner,
});

// Find all vehicles
const findVehicles = async (params) => {

    const query = {
        owner: params.owner ? params.owner : { $exists: true },
    };
    
    const vehicles = await Vehicle.find(query)
        .populate(populateFields)
        .exec();

    return vehicles;
};

// Find vehicle by id
const findVehicleById = async (vehicleId) => {
    const vehicle = await Vehicle.findById(vehicleId)
        .populate(populateFields)
        .exec();

    return vehicle;
};

// Create vehicle
const createVehicle = async (params) => {
    const newVehicle = new Vehicle(buildVehicleParams(params));
    await newVehicle.save();
    return newVehicle;
};

// Update vehicle
const updateVehicle = async (vehicleId, params) => {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
        vehicleId,
        buildVehicleParams(params), {
            new: true
        }
    );

    return updatedVehicle;
};

// Delete vehicle
const deleteVehicle = async (vehicleId) => {
    const deletedInfo = await Vehicle.deleteOne({
        _id: vehicleId
    });
    return deletedInfo;
};

module.exports = {
    findVehicles,
    findVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
};