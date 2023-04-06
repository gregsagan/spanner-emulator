const {
    selectAllRecordsFromSingers,
} = require("./store/queries");

const executeSpanner = async () => {
    await selectAllRecordsFromSingers();

    process.exit();
};

executeSpanner();