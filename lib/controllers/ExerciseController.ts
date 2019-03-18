import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import ExerciseSchema from '../models/ExerciseModel';

const Exercise = mongoose.model('Exercise', ExerciseSchema);

export class ExerciseController {
    public addNewExercise(req: Request, res: Response) {
        if (req.body.name && req.body.category){
            Exercise.findOne({ name: req.body.name }, (err, exercise) => {
                if(err){
                    res.send(err);
                }

                if(exercise){
                    res.send({ status: 'error', message: 'An exercise with this name already exists.' });
                }
    
                let newExercise = new Exercise(req.body);

                newExercise.save((err, user) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(user);
                });
            });
        } else {
            res.send({
                status: 'error',
                message: 'Name and category are required!'
            });
        }
    }

    public getExercises(req: Request, res: Response){
        Exercise.find({}, (err, exercises) => {
            if (err) {
                res.send(err);
            }
            res.json(exercises);
        });
    }

    public getExerciseById(req: Request, res: Response){
        Exercise.findById(req.params.userId, (err, exercise) => {
            if (err) {
                res.send(err);
            }
            res.json(exercise);
        });
    }

    public updateExercise(req: Request, res: Response){
        if(req.body.name){
            Exercise.findOne({ name: req.body.name }, (err, exercise) => {
                if (err) {
                    res.send(err);
                }

                if (exercise) {
                    res.send({ status: 'error', message: 'An exercise with this name already exists.' });
                }

                Exercise.findOneAndUpdate({ _id: req.params.exerciseId }, req.body, { new: true }, (err, updatedExercise) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(updatedExercise);
                });
            });
        } else {
            res.send({ status: 'error', message: 'Name is required!'});
        }
    }

    public deleteExercise(req: Request, res: Response){
        Exercise.deleteOne({ _id: req.params.exerciseId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'The exercise has been deleted!' });
        });
    }
}