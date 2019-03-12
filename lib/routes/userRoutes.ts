import { Request, Response } from "express";

import { UserController } from "../controllers/UserController";

export class Routes {
    public userController: UserController = new UserController();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // User 
        app.route('/user')
            .get(this.userController.getUsers)
            .post(this.userController.addNewUser)

        app.route('/user/:userId')
            .get(this.userController.getUserById)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser)
        
        app.route('/user/authenticate')
            .post(this.userController.authenticateUser)
    }
}