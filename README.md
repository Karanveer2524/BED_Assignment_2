# README

## Project Overview
This API provides management functionalities for **branches** and **employees**. It is built using **TypeScript** and **Node.js**, with **Firebase** as the backend database. The API allows users to perform CRUD operations on branches and employees, with proper validation and error handling.

### Key Features:
- **Branch Management**: Create, read, update, and delete branches.
- **Employee Management**: Create, read, update, and delete employees.
- **Validation**: Request validation using schemas.
- **Error Handling**: Centralized error handling middleware.
- **Testing**: Unit and integration tests using Jest.
- **CI/CD**: GitHub Actions for continuous integration and linting.

---

## Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase account (for database configuration)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/Karanveer2524/BED_Assignment_2.git
   cd BED_Assignment_2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Download the Firebase configuration file (`firebaseConfig.json`) and place it in the `config/` directory.

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     FIREBASE_PROJECT_ID=your_firebase_project_id
     FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     FIREBASE_APP_ID=your_firebase_app_id
     ```

5. Run the application:
   ```bash
   npm start
   ```

---

## Example Usage

### Authentication
This API does not require authentication for now. All endpoints are publicly accessible.

### Sample Requests
#### Get All Employees
```typescript
const response = await fetch('http://localhost:3000/api/v1/employees');
const data = await response.json();
console.log(data);
```

#### Create a New Employee
```typescript
const newEmployee = {
  name: "AA King",
  position: "Customer Service Supervisor",
  department: "Customer Service",
  email: "AA.king@pixell-river.com",
  phone: "506-555-4536",
  branchId: 9
};

const response = await fetch('http://localhost:3000/api/v1/employees', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newEmployee)
});
const data = await response.json();
console.log(data);

Postman Example
Request URL
Copy
http://localhost:3000/api/v1/employees
Request Body (JSON)
json
Copy
{
  "name": "JP",
  "position": "Customer Service Supervisor",
  "department": "Customer Service",
  "email": "JP.king@global-relew.com",
  "phone": "485-633-7585",
  "branchId": 9
}
Response (201 Created)
json
Copy
{
  "name": "JP",
  "position": "Customer Service Supervisor",
  "department": "Customer Service",
  "email": "JP.king@global-relew.com",
  "phone": "485-633-7585",
  "branchId": 9,
  "id": "HTTPQW/kingFMO-TRALL"
}
```

#### Get Employee by ID
```typescript
const response = await fetch('http://localhost:3000/api/v1/employees/t4zLtWdv0jKXpiXMInbP');
const data = await response.json();
console.log(data);
```

#### Update Employee
```typescript
const updatedEmployee = {
  name: "AA King",
  position: "Customer Service Supervisor",
  department: "Customer Service",
  email: "AA.king@pixell-river.com",
  phone: "489-632-7896",
  branchId: 9
};

const response = await fetch('http://localhost:3000/api/v1/employees/t4zLtWdv0jKXpiXMInbP', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedEmployee)
});
const data = await response.json();
console.log(data);
```

#### Delete Employee
```typescript
const response = await fetch('http://localhost:3000/api/v1/employees/t4zLtWdv0jKXpiXMInbP', {
  method: 'DELETE'
});
console.log(response.status); // 204 for successful deletion
```

#### Get Employees by Department
```typescript
const response = await fetch('http://localhost:3000/api/v1/employees/department/Customer Service');
const data = await response.json();
console.log(data);
```

#### Get Employees by Branch ID
```typescript
const response = await fetch('http://localhost:3000/api/v1/employees/branch/10');
const data = await response.json();
console.log(data);
```