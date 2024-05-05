# Health Care Project

This is the backend side of the Health Care Project, built using Express/Typescript. It provides a REST API for managing patients, nurses, and departments.

## Features

- Authentication using JOI
- Authorization using JWT/Passport-JWT
- Testing with Jest
- Documentation using Postman
- Deployment using Docker

## API Endpoints

### Patients

- `POST /ROOT/Patients/createPatient`: Create a new patient
- `GET /ROOT/Patients/getAllPatients`: Get all patients
- `GET /ROOT/Patients/getPatient/:id`: Get a specific patient by ID
- `DELETE /ROOT/Patients/deletePatient/:id`: Delete a patient by ID
- `PUT /ROOT/Patients/updatePatient/:id`: Update a patient by ID

### Nurses

- `POST /ROOT/Nurse/createNurse`: Create a new nurse
- `GET /ROOT/Nurse/getAllNurses`: Get all nurses
- `GET /ROOT/Nurse/getNurse/:id`: Get a specific nurse by ID
- `DELETE /ROOT/Nurse/deleteNurse/:id`: Delete a nurse by ID
- `PUT /ROOT/Nurse/updateNurse/:id`: Update a nurse by ID

### Departments

- `GET /ROOT/Department/getAllDepartments`: Get all departments
- `GET /ROOT/Department/getDepartment/:id`: Get a specific department by ID
- `DELETE /ROOT/Department/deleteDepartment/:id`: Delete a department by ID
- `PUT /ROOT/Department/updateDepartment/:id`: Update a department by ID
- `POST /ROOT/Department/createDepartment`: Create a new department
