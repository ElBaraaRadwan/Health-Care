import express from "express";
import userRoutes from "./api/users/user.routes";
import depRoutes from "./api/dep/router";
import programRoutes from "./api/users/program.routes";
import allergyRoutes from "./api/users/Allergy.routes";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRoutes);
app.use("/api/department", depRoutes);
app.use("/api/program", programRoutes);
app.use("/api/allergy", allergyRoutes);

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
