import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";
import helmet from "helmet";
import cors from "cors";

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());

// CORS Configuration for localhost development
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Company API",
      version: "1.0.0",
      description: "API for managing employees and branches in the company",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
    tags: [
      { name: "Server Health Check", description: "API to check the server's health status" },
      { name: "Employee Management", description: "Operations related to managing employees" },
      { name: "Branch Management", description: "Operations related to managing branches" },
    ],
    components: {
      schemas: {
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Employee ID' },
            name: { type: 'string' },
            position: { type: 'string' },
            department: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            branchId: { type: 'string' },
          },
        },
        NewEmployee: {
          type: 'object',
          properties: {
            name: { type: 'string', required: true },
            position: { type: 'string', required: true },
            department: { type: 'string', required: true },
            email: { type: 'string', format: 'email', required: true },
            phone: { type: 'string', required: true },
            branchId: { type: 'string', required: true },
          },
          required: ['name', 'position', 'department', 'email', 'phone', 'branchId'],
        },
        UpdateEmployee: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            position: { type: 'string' },
            department: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            branchId: { type: 'string' },
          },
        },
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/app.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Employee routes
app.use("/api/v1/employees", employeeRoutes);

// Branch routes
app.use("/api/v1/branches", branchRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Server Health Check
 *     description: Check if the server is running.
 *     tags:
 *       - Server Health Check
 *     responses:
 *       200:
 *         description: Server is up and running
 *       500:
 *         description: Server error
 */
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Error Handling Middleware
app.use(errorHandler); // Register error handler AFTER routes

// Start server (only if not in test environment)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
