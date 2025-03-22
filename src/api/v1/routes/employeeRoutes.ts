import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { createEmployeeSchema, updateEmployeeSchema } from "../validations/employee.schema";
import { EmployeeService } from "../services/employeeService";
import { FirebaseRepository } from "../repositories/firebaseRepository";

const router = Router();
const firebaseRepository = new FirebaseRepository();
const employeeService = new EmployeeService(firebaseRepository);
const employeeController = new EmployeeController(employeeService);

/**
 * @swagger
 * tags:
 *   name: Employee Management
 *   description: API endpoints for managing employees
 */

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee with the provided details.
 *     tags: [Employee Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewEmployee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created employee
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/", validateRequest(createEmployeeSchema), employeeController.createEmployee.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     description: Returns a list of all employees.
 *     tags: [Employee Management]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Internal server error
 */
router.get("/", employeeController.getAllEmployees.bind(employeeController));
router.get("/employees/:id", employeeController.getEmployeeById);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);

// Logical Operation Endpoints
router.get("/employees/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/employees/department/:department", employeeController.getEmployeesByDepartment);

export default router;
