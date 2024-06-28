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