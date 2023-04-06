const {
  spannerDatabase
} = require("../resources/spanner");

exports.selectAllRecordsFromSingers = async () => {
  const query = "SELECT * FROM TestTable";
  try {
    const [rows] = await spannerDatabase.run({
      sql: query,
      json: true,
    });
    console.log(`Query: ${rows.length} found.`);

    return rows;
  } catch (err) {
    return err;
  }
};