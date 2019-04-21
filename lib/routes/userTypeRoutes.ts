import { UserTypeController } from "../controllers/index";

export default class UserTypeRoutes {
    public userTypeController: UserTypeController = new UserTypeController();

    public routes(app): void {
        app.route('/userType')
            .get(this.userTypeController.getUserTypes)
            .post(this.userTypeController.addNewUserType)

        app.route('/userType/:userTypeId')
            .get(this.userTypeController.getUserTypeById)
            .patch(this.userTypeController.updateUserType)
            .delete(this.userTypeController.deleteUserType)
    }
}