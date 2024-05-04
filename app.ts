import express from "express";
import depRoutes from "./api/v1/dep/router";
import patientRoutes from "./api/v1/users/patient.routes";
import nurseRoutes from "./api/v1/users/nurse.routes";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/department", depRoutes);
app.use("/patient", patientRoutes);
app.use("/nurse", nurseRoutes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

/*
TODO: MUST done in this Project
# Create REST API routes 
# Create an Authorization routes using JWT and Passport-JWT credentials
# Create an Authenticate routes using JOI
# Create Jest to test the API routes
# Create a Documentation using Postman
# Upload Project & Documentation to Github
# Deploy the project using Docker
*/
