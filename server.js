import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { testCron } from "./scheduler/testCron.js";
import permissionSeeder from "./seeds/permissionSeeder.js";

dotenv.config();
const app = express();
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";

//Importing mongodb connection
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Rendering index page
app.get("/", (req, res) => {
  res.render("index");
});

//Swagger setup
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "DiamondLease Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "DiamondLease",
        url: "https://diamondlease.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./controllers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api/documentation",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Call the cron job function to start the job
testCron();

//Seeder

permissionSeeder();

//Application routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);

//Mongoose error handling
app.use(notFound);
app.use(errorHandler);

//Server listen
app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
