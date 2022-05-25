const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Vis API',
            description: 'KNDI data for information',
            contact: {
                name: "Toruck.Dev"
            }
        },
        servers: [
            {
                url: 'http://localhost:5000'
            },
            {
                url: 'http://188.166.253.235:5000'
            }
        ]
    },
    apis: [
        './src/routes/*.route.js',
    ]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerDocs,
    swaggerUi
}