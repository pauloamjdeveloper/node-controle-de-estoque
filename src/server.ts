import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import swaggerDocument from "../swagger.json";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use("/v1", router);
app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error."
    });
});

app.get("/terms", (request: Request, response: Response) => {
    return response.json({
        message: "Terms of Use License"
    })
});

app.listen(port, () => {
    console.log("Server running on port 3333 - Stock Control Project");
});