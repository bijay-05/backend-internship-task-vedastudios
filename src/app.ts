import { PrismaClient } from '@prisma/client';
import AdminJS from 'adminjs';
import express from 'express';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource, getModelByName } from '@adminjs/prisma';


const prisma = new PrismaClient();

const PORT = 3000;

AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const adminOptions = {
    resources : [{
      resource: { model: getModelByName('Category'), client: prisma },
      options: {}
    },
    {
      resource: { model: getModelByName('Product'), client: prisma },
      options: {}
    }
  ]
  }

  const app = express();

  const admin = new AdminJS(adminOptions);

  admin.watch();

  const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http:20.244.35.164:${PORT}${admin.options.rootPath}`)
  })
}

start();