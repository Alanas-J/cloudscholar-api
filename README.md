# CloudScholar API Backend
By Alanas Jakubauskas C18473312 TU856/4

## How To Run
An installation of Node.js is required This can be downloaded from https://nodejs.org/en/.

In the root directory: 
run 'npm install' to download all the package dependancies.

'npm run serve' is used to run the application. 

## Database Pre-requisites
In order to run the API, it must be pointed at a PostgreSQL server, downloadable from https://www.postgresql.org/.

The credentials of the created database such as database name and the root access account credentials must be specified in a configuration file as shown under the '/config' directory.

The 'server.js' entrypoint script then must be adjusted to use the specified configuration file by either overwriting the defauly or with the passing of a 'NODE_ENV' environment variable.
