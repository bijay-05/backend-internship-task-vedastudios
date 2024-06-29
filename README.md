# backend-internship-task-vedastudios

This repository contains all the necessary documentation on how to reproduce all the solutions to the `Backend Intern Task`.

## Tasks
- Fetch the product details from `dummyjson.com/products` through API call.
- Store the response data into **Postgresql** database by normalizing the data into different schemas.
- Fetch and store the data from newly stored **Postgresql** database
- Using **AdminJS** with **Typescript**:
  - List all the products by fields product `image`, `title`, `category`, `price` and `rating` with CRUD operations.
  - List all the category by field category `name` with CRUD operations.


## Fetch products from API and store into Database

- Initialize this repository as a **Node** project with `npm init -y`
- Installing `Typescript` as a Development dependency with `npm i -D typescript`
- Initializing typescript compiler `tsc` with `tsc --init`. This creates a `tsconfig.json` file in the root directory of the project repository.
- Installing remaining dependencies for the project

```
$ npm i express express-session express-formidable axios adminjs prisma

$ npm i @adminjs/express @adminjs/prisma @prisma/client
```

### Setup Postgresql database in localhost
- Installed and configured database locally in ubuntu machine
```
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib

#checking if postgresql database in running or not
$ systemctl status postgresql.service

# using psql to connect to postgresql
$ sudo -i -u postgres
$ psql

# now we are inside psql commandline prompt
# change the default user password
postgres# alter role postgres with password `app123';
```

### Setup Prisma ORM to create tables and query database from application
- Initializing `prisma` cli with `npx prisma init`. This creates `prisma` directory in the root directory with file `schema.prisma` inside the folder. Besides this, the command also creates a `.env` file with environment variable `DATABASE_URL` for our postgresql database.
- Edit the `.env` file with `DATABASE_URL` for our local database.
- Edit the `prisma/schema.prisma` file with models ( `Category`, `Product`, `Image` ), which represent equivalent tables in our **Postgresql** database.