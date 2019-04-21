import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { UserTypeSchema } from '../models/index';

const UserType = mongoose.model('UserType', UserTypeSchema);

export class UserTypeController {
    public addNewUserType = (req: Request, res: Response) => {
        if (req.body.title) {
            UserType.findOne({ title: req.body.title }, (err, existingUserType) => {
                if (err) return res.status(500).send(err);
                if (existingUserType) return res.status(409).send({ message: 'A user type with this title already exists.' });

                const newUserType = new UserType(req.body);

                newUserType.save((err, createdUserType) => {
                    if (err) return res.status(500).send(err);

                    return res.send({ userType: createdUserType });
                });
            });
        } else {
            return res.status(400).send({ message: 'Title is required!' });
        }
    }

    public getUserTypes = (req: Request, res: Response) => {
        UserType.find({}, (err, userTypes) => {
            if (err) return res.status(500).send(err);

            return res.send({ userTypes });
        });
    }

    public getUserTypeById = (req: Request, res: Response) => {
        UserType.findById(req.params.userTypeId, (err, userType) => {
            if (err) return res.status(500).send(err);

            return res.send({ userType });
        });
    }

    public updateUserType = (req: Request, res: Response) => {
        UserType.findOneAndUpdate({ _id: req.params.userTypeId }, req.body, { new: true }, (err, updatedUserType) => {
            if (err) return res.status(500).send(err);

            return res.send({ userType: updatedUserType });
        });
    }

    public deleteUserType = (req: Request, res: Response) => {
        UserType.deleteOne({ _id: req.params.userTypeId }, (err) => {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'The user type has been deleted!' });
        });
    }
}