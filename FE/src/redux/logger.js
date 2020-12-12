import { createLogger } from "redux-logger";

export const logger =  createLogger({
    level:'info',
    duration:true,
    diff:true
});