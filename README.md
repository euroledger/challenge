# Coding Challenge

ExpressJS/SQL Database Coding Challenge

Instructions for how to install and run the code (windows):

1. To view the github repo go to:

`https://github.com/euroledger/challenge`

2. clone the code (important: always work on test branch)

`git clone -b test https://github.com/euroledger/daledger.git`

`cd challenge`

3. Install server node modules

`npm install`

# Setting up the (MySQL) Database

4. Install MySQL

`https://dev.mysql.com/downloads/installer/`

5. Execute the schema script in 

`sql/create_schema.sql`

This will create the database (testdb) and the four tables we use in this exercise, along with indexes, primary/foreign keys etc.
It should also load 100 rows of dummy (test) data into the users table and the products table

If there are any connection errors like this one:

`ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server`

Run the script set_root.sql which should fix this

You will need to create a .env file in the root folder containing the following environment variables:

    MYSQL_USER='<YOUR DB USER'
    MYSQL_PASSWORD='<YOUR DB PASSWORD'
    MYSQL_HOST='localhost'
    MYSQL_PORT='3306'
    MYSQL_DATABASE='testdb'`

6. To run the server, execute in the root folder as follows:

`npm run dev`

This runs the server using nodemon

To interact with the server, use this URL in the browser:

`localhost:3000`

To list all products, use this REST API endpoint, type in browser:

`localhost:3000/products`