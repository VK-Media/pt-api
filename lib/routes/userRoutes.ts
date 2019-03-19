import { Request, Response } from "express";

import { UserController } from "../controllers/index";

export default class UserRoutes {
    public userController: UserController = new UserController();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'This is a JUST ANOTHER test!'
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
        
        app.route('/user/authenticate/credentials')
            .post(this.userController.authenticateUserWithCredentials)
        
        app.route('/user/authenticate/jwt')
            .get(this.userController.authenticateUserWithJWT)
    }
}