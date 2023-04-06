gcloud config configurations activate emulator
gcloud spanner instances create spanner-instance --config=emulator-config --description="Test Instance" --nodes=1
gcloud spanner databases create spanner-database --instance=spanner-instance --ddl="CREATE TABLE TestTable (Key INT64, Value STRING(MAX)) PRIMARY KEY (Key)"
gcloud spanner rows insert --table=TestTable --database=spanner-database --instance=spanner-instance --data=Key=1,Value=TestValue1
gcloud spanner databases execute-sql spanner-database --instance spanner-instance --sql "SELECT * FROM TestTable"