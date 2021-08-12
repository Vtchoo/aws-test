# Amazon Web Services test API

This is a NodeJS api to test a few Amazon's Web Services.<br />

## Services
In this project, there are so far 3 services in use other than the EC2 used to host the api itself. It uses RDS - Relational Database Service - with an MariaDB database, S3, the file hosting "bucket" service and the IAM service, used to generate a procedural user with specific permissions.

## Credentials
In order to use the S3 bucket, you need to create a new user in IAM service and grant it S3 Bucket's full permissions. The user will have an access key and a secret key, that will be used in .env file to manage access to S3.

## .env file
In order to the api fully work, the .env file should have the following values:
```
DB_HOST=The database endpoint
DB_PORT=The database port
DB_NAME=The database name (preferrably initialized during the database setup in aws)
DB_USER=The main db username, admin is default
DB_PASS=The user password

AWS_S3_ACCESS_KEY=IAM user's access key
AWS_S3_SECRET_KEY=IAM user's secret key
AWS_S3_DEFAULT_REGION=The region of the S3 bucket
AWS_S3_BUCKET_NAME=The bucket name
```