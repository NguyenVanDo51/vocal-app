const strapi = require('@strapi/strapi')
console.log('process.env', process.env)

strapi.createStrapi({distDir: './dist'}).start()
