const Service = require("../models/Service");

// Find all services
const findServices = async () => {

    const services = await Service.find()
        .exec();

    return services;
};

// Create services
const createService = async (params) => {
    const newService = new Service(params);
    await newService.save();
    return newService;
};

module.exports = {
    findServices,
    createService,
};