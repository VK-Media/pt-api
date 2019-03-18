import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import UserRoutes from "./routes/userRoutes";
import ExerciseRoutes from "./routes/exerciseRoutes";

class App {
    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public exerciseRoutes: ExerciseRoutes = new ExerciseRoutes();
    public mongoUrl: string = process.env.MONGODB_URL || 'mongodb+srv://dev-user:0YEQY7TSlUrFfN3L@pt-development-rqjee.gcp.mongodb.net/test?retryWrites=true';

    constructor() {
        this.app = express();
        this.config();
        this.userRoutes.routes(this.app); 
        this.exerciseRoutes.routes(this.app); 
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;