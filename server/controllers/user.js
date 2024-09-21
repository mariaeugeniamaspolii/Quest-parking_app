const User = require("../models/User");

const populateFields = [{
        path: "properties"
    },
    {
        path: "parkings"
    },
    {
        path: "vehicles"
    },
    {
        path: "favorites"
    },
    {
        path: "bookings"
    },
    {
        path: "meteredparking"
    },
    { path: "searches" },
];

const buildUserParams = (params) => ({
    name: params.name,
    email: params.email,
    password: params.password,
    rank: params.rank,
    avatar: params.avatar,
    subscription: params.subscription,
    messages: params.messages,
    paymentMethod: params.paymentMethod,
    properties: params.properties,
    parkings: params.parkings,
    vehicles: params.vehicles,
    favorites: params.favorites,
    bookings: params.bookings,
    searches: params.searches,
});

const findUsers = async (params) => {

    const query = {
        name: params.name ? { $regex: new RegExp(params.name, "i") } : { $exists: true },
        email: params.email ? { $regex: new RegExp(params.email, "i") } : { $exists: true },
        properties: params.properties ? params.properties : { $exists: true },
        parkings: params.parkings ? params.parkings : { $exists: true },
        rank: params.rank ? { $gte: params.rank } : { $exists: true },
    };

    const users = await User.find(query)
        .populate(populateFields)
        .exec();

    return users;
};

// const findUsers = async () => {

//     const users = await User.find()
//         .exec();

//     return users;
// };

const findUserById = async (userId) => {
    const user = await User.findById(userId).exec();
    return user;
};

const getUserName = async (userId) => {
    const user = await findUserById(userId);
    return user ? user.name : null;
};

const createUser = async (params) => {
    const newUser = new User(buildUserParams(params));
    await newUser.save();
    return newUser;
};

const updateUser = async (userId, params) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        buildUserParams(params), {
            new: true
        }
    );

    return updatedUser;
};

const deleteUser = async (userId) => {
    const deletedInfo = await User.deleteOne({
        _id: userId
    });
    return deletedInfo;
};

module.exports = {
    findUsers,
    findUserById,
    getUserName,
    createUser,
    updateUser,
    deleteUser,
};