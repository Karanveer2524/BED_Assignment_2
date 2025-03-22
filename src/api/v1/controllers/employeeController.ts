/* eslint-disable */
import { Request, Response, NextFunction } from "express"; 
import { EmployeeService } from "../services/employeeService";

export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    async createEmployee(req: Request, res: Response, next: NextFunction) { 
        try {
            const employeeData = req.body;
            const newEmployee = await this.employeeService.createEmployee(employeeData);
            res.status(201).json(newEmployee);
        } catch (error) {
            console.error("Controller: Error creating employee:", error);
            next(error); 
        }
    }

    async getAllEmployees(req: Request, res: Response, next: NextFunction) { 
        try {
            const employees = await this.employeeService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            console.error("Controller: Error getting all employees:", error);
            next(error); 
        }
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        try {
            const employee = await this.employeeService.getEmployeeById(id);
            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        } catch (error) {
            console.error("Controller: Error getting employee by ID:", error);
            next(error); 
        }
    }

    async updateEmployee(req: Request, res: Response, next: NextFunction) { 
        const id = req.params.id;
        const updateData = req.body;
        try {
            const updatedEmployee = await this.employeeService.updateEmployee(id, updateData);
            if (updatedEmployee) {
                res.status(200).json(updatedEmployee);
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        } catch (error) {
            console.error("Controller: Error updating employee:", error);
            next(error); 
        }
    }

    async deleteEmployee(req: Request, res: Response, next: NextFunction) { 
        const id = req.params.id;
        try {
            const success = await this.employeeService.deleteEmployee(id);
            if (success) {
                res.status(200).json({ message: "Employee deleted successfully" });
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        } catch (error) {
            console.error("Controller: Error deleting employee:", error);
            next(error); 
        }
    }

    async getEmployeesByBranch(req: Request, res: Response, next: NextFunction) {
        const branchId = parseInt(req.params.branchId, 10);

        console.log("Controller: Getting employees by branch ID:", branchId);

        try {
            const employees = await this.employeeService.getEmployeesByBranch(branchId);
            res.status(200).json(employees);
        } catch (error) {
            console.error("Controller: Error getting employees by branch ID:", error);
            next(error); 
        }
    }

    async getEmployeesByDepartment(req: Request, res: Response, next: NextFunction) { 
        const department = req.params.department;
        try {
            const employees = await this.employeeService.getEmployeesByDepartment(department);
            res.status(200).json(employees);
        } catch (error) {
            console.error("Controller: Error getting employees by department:", error);
            next(error); 
        }
    }
}