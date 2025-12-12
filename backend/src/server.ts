import app from "./app";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
        process.exit(1)
    })
