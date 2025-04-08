import { config } from "dotenv";
import { envsafe, str, port } from "envsafe";

config();
export const env = envsafe({
    NODE_ENV: str({
        default: "production",
        devDefault: "development",
        choices: ["development", "production", "test"],
    }),
    PORT: port({
        devDefault: 3001,
        desc: 'The port the app is running on',
        example: 80,
    }),
    MONGODB_URI: str({
        desc: 'MongoDB connection string',
        devDefault: 'mongodb://localhost:27017/mydatabase',
    }),
});

