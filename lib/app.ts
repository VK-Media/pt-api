import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { Routes } from "./routes/routes";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb+srv://code-user:6wSXtNwXNvaus9X@pt-api-dxkzc.gcp.mongodb.net/test?retryWrites=true';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app); 
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        //mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;