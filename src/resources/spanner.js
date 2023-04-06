const {Spanner} = require("@google-cloud/spanner");
require("dotenv").config();
const {
    ENVIRONMENT,
    GCP_PROJECT_ID,
    SPANNER_INSTANCE_ID,
    SPANNER_EMULATOR_HOST,
    SPANNER_DATABASE_NAME
} = process.env;

// When running locally, host is required therefore we defined an environment variable in our .env file to specify that.
const spanner = ENVIRONMENT === "development" 
    ? new Spanner({projectId: GCP_PROJECT_ID, host: SPANNER_EMULATOR_HOST})
    : new Spanner({projectId: GCP_PROJECT_ID});

const instance = spanner.instance(SPANNER_INSTANCE_ID);

const database = instance.database(SPANNER_DATABASE_NAME);

exports.spannerDatabase = database;