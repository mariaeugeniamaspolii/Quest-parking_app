module.exports = {
    mongodbLink: `mongodb+srv://${process.env.MDB_CLUSTER}:${process.env.MDB_PASS}@quest-cluster.rw26myt.mongodb.net/QuestDB?retryWrites=true&w=majority`,
};