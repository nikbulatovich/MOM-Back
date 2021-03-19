# Moms Over Matter Backend API

## Setup


Start off by installing all the dependencies:
```
npm install
```

The database connection will read the environmental variables in order to connect to the postgresql database.
We will use a .env file to set the environmental variables.

Copy the example .env file into your own .env file (these files are ignored in the .gitignore so its safe to put your password in it):
```
cp example.env .env
```

Now edit your .env and set the username and password field. It might look something like this:
```
PGUSER=thomas
PGHOST=localhost
PGPASSWORD=supersecretpassword
PGDATABASE=momsovermatter
PGPORT=5432 
```

Now lets create the initial database tables. Create the database using the following command:
```
createdb momsovermatter
```

and create the tables with the project script:
```
npm run initdb
```

Check that the tables were properly created:
```
psql momsovermatter

momsovermatter=# \dt
```

You should see the tables were created now

## Running the server

Simply run 
```
npm start
```




