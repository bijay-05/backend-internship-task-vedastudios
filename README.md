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
- Now we run migrations on our database with `npx prisma migrate dev --name init`. This command, first creates a new SQL migration file for this migration and then  runs this SQL migration file against the database. Finally we get prisma model equivalent tables in our database.
- The above command does one more thing: it generates `PrismaClient`, which we can use in our application to perform operations on the database.

![prisma-migration-success]()

### Fetch the products and populate the database

- We will first fetch categories from the API `dummyjson.com/products/categories`

- For each category object, insert that category into `Category` table and fetch product records from the API `dummyjson.com/products/category/{category-slug}`.

- For each product object, insert that product into `Product` table and extract `images` property of the particular product object.

- For each image URL in the `images` array, we will insert that image record into `Image` table.

> There was one issue encountered, when running the main function to populate the database. The environment variable `DATABASE_URL` in `.env` file was not accessible for `PrismaClient` from `populatedb.js` script. So, I had to export the variable with command `export DATABASE_URL="postgresql://<username>:<password>@localhost:5432/ecommerce?schema=public"`

### Setup Admin Panel with AdminJS and Express

- We will use the `PrismaClient` here, to provide prisma models as resources to `AdminJS instance`. But before that, we will register the `Database` and `Resource` adapters from `@adminjs/prisma` with `AdminJS`.( so `AdminJS` can identify the adapters used to connecting to the database )

- We pass the available resources ( **prisma models** ) as `adminOptions` configuration object to `AdminJS` instance.

- Then, create an `express app`, and an instance of `AdminJS` with above configuration object.

- Build a router for `/{admin.options.rootPath}` with `AdminJSExpress.buildRouter()`, and use that router with above created `express app`.

- Finally, start the `express app` by calling `app.listen()` method, and passing the **PORT** number and callback function as argument.