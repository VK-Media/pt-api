import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { UserSchema } from '../models/UserModel';

const User = mongoose.model('User', UserSchema);

export class UserController {
    public addNewUser(req: Request, res: Response) {
        let userData = req.body;

        if (req.body.password && req.body.confirmPassword && (req.body.password === req.body.confirmPassword)){
            bcrypt.hash(req.body.password, 10, (err, hash: String) => {
                if(err){
                    res.send(err);
                }
                userData.password = hash;

                let newUser = new User(userData);
                
                newUser.save((err, user) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(user);
                });
            });
        } else {
            res.send({
                status: 'error',
                message: 'Password and confirm password must both be set and MUST match'
            });
        }
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserById(req: Request, res: Response) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!' });
        });
    }
}