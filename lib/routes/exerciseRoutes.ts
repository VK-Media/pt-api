import { ExerciseController } from "../controllers/index";

export default class ExerciseRoutes {
    public exerciseController: ExerciseController = new ExerciseController();

    public routes(app): void {
        app.route('/exercise')
            .get(this.exerciseController.getExercises)
            .post(this.exerciseController.addNewExercise)

        app.route('/exercise/:exerciseId')
            .get(this.exerciseController.getExerciseById)
            .put(this.exerciseController.updateExercise)
            .delete(this.exerciseController.deleteExercise)
    }
}