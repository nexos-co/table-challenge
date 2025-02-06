import { config } from "dotenv";
import { bool, envsafe, port, str, } from "envsafe";

config();

export const env = envsafe({
    NODE_ENV: str({
        default: "production",
        devDefault: "development",
        choices: ["development", "production", "test"],
    }),
    JWT_SECRET: str({
        devDefault: "jwtSecret",
    }),
    PORT: port({
        devDefault: 3001,
        desc: 'The port the app is running on',
        example: 80,
    }),
    MAIL_USER: str(),
    MAIL_PASSWORD: str(),
    MAIL_HOST: str(),
});
