import { Request, Response } from "express";

import { ExerciseController } from "../controllers/ExerciseController";

export default class ExerciseRoutes {
    public exerciseController: ExerciseController = new ExerciseController();

    public routes(app): void {
        // User 
        app.route('/exercise')
            .get(this.exerciseController.getExercises)
            .post(this.exerciseController.addNewExercise)

        app.route('/exercise/:exerciseId')
            .get(this.exerciseController.getExerciseById)
            .put(this.exerciseController.updateExercise)
            .delete(this.exerciseController.deleteExercise)
    }
}