import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: "Task Management API Documentation",
        version: "1.0.0",
        description:
            "This is the API documentation for the Task Management application.",
    },
    servers: [
        {
            url: "http://localhost:3000/api/v1",
            description: "Local server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
  },
  apis: ["src/api/v1/routes/routes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Function to integrate Swagger UI
const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
