const Search = require("../models/Search");

const populateFields = [
    { path: "user"},
];

const buildSearchParams = (params) => ({
    user: params.user,
    filters: {
        address: {
            name: params.filters.address.name,
            neighborhood: params.filters.address.neighborhood,
            longitude: params.filters.address.longitude,
            latitude: params.filters.address.latitude,
            distance: params.filters.address.distance,
        },
        minPrice: params.filters.minPrice,
        maxPrice: params.filters.maxPrice,
        dimensions: {
            length: params.filters.dimensions.length,
            width: params.filters.dimensions.width,
            height: params.filters.dimensions.height,
        },
        action: params.filters.action,
        rentMode: params.filters.rentMode,
        services: params.filters.services,
    },

});

const findSearches = async (params) => {

    const query = {
        user: params.user ? params.user : { $exists: true },
    };

    const Searches = await Search.find(query)
        .populate(populateFields)
        .exec();

    return Searches;
};

const findSearchById = async (searchId) => {
    const search = await Search.findById(searchId).exec();
    return search;
};

const getSearchName = async (searchId) => {
    const search = await findSearchById(searchId);
    return search ? search.name : null;
};

const createSearch = async (params) => {
    const newSearch = new Search(buildSearchParams(params));
    await newSearch.save();
    return newSearch;
};

const updateSearch = async (searchId, params) => {
    const updatedSearch = await Search.findByIdAndUpdate(
        searchId,
        buildSearchParams(params), {
            new: true
        }
    );

    return updatedSearch;
};

const deleteSearch = async (searchId) => {
    const deletedInfo = await Search.deleteOne({
        _id: searchId
    });
    return deletedInfo;
};

module.exports = {
    findSearches,
    findSearchById,
    getSearchName,
    createSearch,
    updateSearch,
    deleteSearch,
};
