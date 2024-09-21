const { addToObject } = require("../utils/object")
const Property = require("../models/Property");

const populateFields = [{
    path: "owner"
}];

const buildPropertyParams = (params) => ({
    address: {
        name: params.address.name,
        neighborhood: params.address.neighborhood,
        longitude: params.address.longitude,
        latitude: params.address.latitude,
    },
    price: params.price,
    dimensions: {
        length: params.dimensions.length,
        width: params.dimensions.width,
        height: params.dimensions.height,
    },
    action: params.action,
    rentMode: params.rentMode,
    services: params.services,
    images: params.images,
    owner: params.owner,
});

const findProperties = async (params) => {
    const query = {}
    if (params.minPrice) addToObject(query, "price", { $gte: params.minPrice });
    if (params.maxPrice) addToObject(query, "price", { $lte: params.maxPrice });
    console.log('query: ', query);

        // name: params.address.name ? { $regex: new RegExp(params.address.name, 'i') } : { $exists: true },
        // minPrice: params.price ? { $gte: params.price } : { $exists: true },
        // maxPrice: params.price ? { $lte: params.price } : { $exists: true },
        // dimensions: params.dimensions ? { $gte: params.dimensions } : { $exists: true },
        // action: params.action ? params.action : { $exists: true },
        // rentMode: params.rentMode ? params.rentMode : { $exists: true },
        // services: params.services ? params.services : { $exists: true },
    // };

    const properties = await Property.find(query)
        .populate(populateFields)
        .exec();
    return properties;
};

const findPropertyById = async (propertyId) => {
    const property = await Property.findById(propertyId).populate(populateFields).exec();
    return property;
};

const createProperty = async (params) => {
    const newProperty = new Property(buildPropertyParams(params));
    await newProperty.save();
    return newProperty;
};

const updateProperty = async (propertyId, params) => {
    const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        buildPropertyParams(params),
        { new: true }
    );

    return updatedProperty;
};

const deleteProperty = async (propertyId) => {
    const deletedInfo = await Property.deleteOne({ _id: propertyId });
    return deletedInfo;
};

module.exports = {
    findProperties,
    findPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
};
