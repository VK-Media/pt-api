import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import UserRoutes from "./routes/userRoutes";

class App {
    public app: express.Application;
    public routePrv: UserRoutes = new UserRoutes();
    public mongoUrl: string = process.env.MONGODB_URL || 'mongodb+srv://code-user:6wSXtNwXNvaus9X@pt-api-dxkzc.gcp.mongodb.net/test?retryWrites=true';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app); 
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