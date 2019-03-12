import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import UserSchema from '../models/UserModel';

const User = mongoose.model('User', UserSchema);

export class UserController {
    public addNewUser(req: Request, res: Response) {
        let userData = req.body;

        if (req.body.password && req.body.email){
            User.findOne({ email: req.body.email }, (err, user) => {
                if(err){
                    res.send(err);
                }

                if(user){
                    res.send({ status: 'error', message: 'A user with this email already exists.' });
                }

                bcrypt.hash(req.body.password, 10, (err, hash: String) => {
                    if (err) {
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
            });
        } else {
            res.send({
                status: 'error',
                message: 'Email and Password are required!'
            });
        }
    }

    public getUsers(req: Request, res: Response){
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserById(req: Request, res: Response){
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser(req: Request, res: Response){
        if(req.body.email){
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    res.send(err);
                }

                if (user) {
                    res.send({ status: 'error', message: 'A user with this email already exists.' });
                }

                User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, updatedUser) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(updatedUser);
                });
            });
        } else {
            res.send({ status: 'error', message: 'Email is required!'});
        }
    }

    public deleteUser(req: Request, res: Response){
        User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'The user has been deleted!' });
        });
    }

    public authenticateUser(req: Request, res: Response){
        User.findOne({ email: req.body.email }, async (err, user: any) => {
            if (err) {
                res.send(err);
            }

            if(await user.authenticate(req.body.password)){
                res.json({ status: 'success', message: "User authenticated" });
            } else {
                res.json({ status: 'error', message: "User not authenticated" });
            }
        });
    }
}