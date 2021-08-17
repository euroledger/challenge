# coding challenge
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

5. Execute the schema script in sql/create_schema.sql

This will create the database (testdb) and the four tables we use in this exercise, along with indexes, primary/foreign keys etc.

`npm run dev`

This concurrently runs the server and client (see package.json)

# To change branch in git
`git checkout master`


`git checkout test`

# To check status
`git status`

This shows which branch you are on and what has changed since the last commit

# To commit to test branch
`git add .`


`git commit -m<comment>`


`git push -u origin test`

# To merge test -> master

`git checkout master`


`git merge test`


`git push origin master`

# DAS-1 TEST 



For information on Git branches/pull requests for the project see Cookbook (or ask Mike)

Also see the Technical Notes document

