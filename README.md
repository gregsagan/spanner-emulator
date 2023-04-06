# spanner-emulator-poc

## Steps using CLI & gcloud
Summarised notes based on the following link found below: https://cloud.google.com/spanner/docs/emulator

1. In order to run the emulator, install Docker, https://www.docker.com/products/docker-desktop?utm_source=cloud.google.com&utm_medium=referral

2. Make sure gcloud is up to date by running the following command in the terminal: `gcloud components update`

3. Open Docker, let it initialise and then run the following command in the terminal: `gcloud emulators spanner start`. 

4. In order to run the emulator, you will need to create a new gcloud configuration file which will contain the emulator config options. If you don't create this new config file, you may encounter issues later on when trying to deploy or run other gcloud commands. Run the following command in the terminal
```
gcloud config configurations create emulator
gcloud config set auth/disable_credentials true
gcloud config set project ${your-project-id}
gcloud config set api_endpoint_overrides/spanner http://localhost:9020/
```

5. Once the emulator config file has been created you can simply call the following command which will activate the config defined above: `gcloud config configurations activate emulator`.

**N.B**. To verify you have the right configuration settings applied, simply call the following command: `gcloud config list`

6. in CLI, run the following command to set the host to localhost: `export SPANNER_EMULATOR_HOST=localhost:9010`

7. Define your instance and database within CLI as follows (example can be found in script/example.sh):
```
gcloud spanner instances create ${instance-name} --config=emulator-config --description="Test Instance" --nodes=1
gcloud spanner databases create ${database-name} --instance=${instance-name} --ddl="CREATE TABLE ${TableName} (Key INT64 NOT NULL, Value STRING(1024),) PRIMARY KEY(id)"
gcloud spanner rows insert --table=${TableName} --database=${database-name} --instance=${instance-name} --data=Key=1,Value=TestValue1
gcloud spanner databases execute-sql ${database-name} --instance ${instance-name} --sql "SELECT * FROM ${TableName}"
```

8. Ensure you have created a .env file and populate **all** necessary keys specified from within the .env-sample file

9. Run `npm i` to install all dependencies within this source code and then simply run: `node src/index.js`.

10. Finally once you have finished with the emulator, don't forget to change your configuration back to default; `gcloud config configurations activate default`.

## References
https://grpc.github.io/grpc/node/grpc.Client.html

https://github.com/googleapis/nodejs-spanner/blob/main/src/index.ts