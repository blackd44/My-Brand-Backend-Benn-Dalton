import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API library",
            version: "1.0.0",
        },
        servers: [{ url: 'http://localhost:4444' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./swagger/*.js"],
};
const swagger = swaggerJSDoc(options);

export default swagger