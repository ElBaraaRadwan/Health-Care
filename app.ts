import express from "express";
import depRoutes from "./api/v2/dep/router";
// import patientRoutes from "./api/v1/users/patient.routes";
// import nurseRoutes from "./api/v1/users/nurse.routes";
import userRoutes from "./api/v2/users/user.routes";
import assignRoutes from "./api/v2/users/assign.routes";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/v2/department", depRoutes);
// app.use("/api/vi/patient", patientRoutes);
// app.use("/api/v1/nurse", nurseRoutes);
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/assign", assignRoutes);

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
