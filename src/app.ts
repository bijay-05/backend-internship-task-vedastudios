import { PrismaClient } from '@prisma/client';
import AdminJS from 'adminjs';
import express from 'express';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource, getModelByName } from '@adminjs/prisma';

import { Components, componentLoader } from './components.js';

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
      options: {
        properties: {
          Image: {
            type: 'string',
            components: {
              list: Components.imageList,
              show: Components.imageShow,
            }
          }
        },
        actions: {
          list: {  // using `after` hook to modify the response from client
                    // and adding image properties ( from Image table ) for the product
              after: async (response) => {
                  const products = response.records.map(async (record) => {
                      const image = await prisma.image.findFirst({
                          where: { productId: record.id },
                          orderBy: {
                              id: 'desc',
                          },
                          select: {
                            'url': true,
                            'id': true
                          }
                      });
                      record.params.Image = image;
                      return record;
                  });
                  response.records = await Promise.all(products);
                  return response;
              }
          },
          show: {
              after: async (response) => {
                  const record = response.record;
                  const image = await prisma.image.findFirst({
                      where: {productId: record.id},
                      orderBy: {
                        id: 'desc',
                      },
                      select: {
                        'url': true
                      }
                  });
                  response.record.params.Image = image;

                  return response;
              }
          }

        }
      }
    }
  ],
  componentLoader
}

  const app = express();

  const admin = new AdminJS(adminOptions);

  admin.watch();

  const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on localhost:${PORT}${admin.options.rootPath}`)
  })
}

start();