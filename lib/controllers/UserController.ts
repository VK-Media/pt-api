import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { UserSchema } from '../models/index';

const User = mongoose.model('User', UserSchema);

export class UserController {
    public addNewUser = (req: Request, res: Response) => {
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
    
                    newUser.save(async (err, user) => {
                        if (err) {
                            res.send(err);
                        }
                        
                        const token = await this.signToken(user._id);

                        res.json({ status: 'success', message: 'The user has been created' });
                    });
                });
            });
        } else {
            res.send({ status: 'error', message: 'Email and Password are required!' });
        }
    }

    public getUsers = (req: Request, res: Response) => {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserById = (req: Request, res: Response) => {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser = (req: Request, res: Response) => {
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

    public deleteUser = (req: Request, res: Response) => {
        User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'The user has been deleted!' });
        });
    }

    public authenticateUserWithCredentials = (req: Request, res: Response) => {
        User.findOne({ email: req.body.email }, async (err, user: any) => {
            if (err) {
                res.send(err);
            }

            if(user){
                if(await user.authenticate(req.body.password)){
                    const token = this.signToken(user._id);

                    if(token){
                        res.json({ status: 'success', message: "User authenticated", token });
                    } else {
                        res.json({ status: 'error', message: "Token could not be generated." });
                    }
                } else {
                    res.json({ status: 'error', message: "User not authenticated" });
                }
            }
        });
    }

    public authenticateUserWithJWT = (req: Request, res: Response) => {
        const token = req.headers['x-access-token'];

        if (typeof token !== 'string') return res.status(401).send({ status: 'error', message: 'No token provided.' });

        jwt.verify(token, process.env.JWT_SECRET || 'dev-secret', function (err, decoded) {
            if (err) return res.status(401).send({ status: 'error', message: 'Failed to authenticate token.' });

            res.send({ status: 'success', message: 'The token has been verified!', decoded });
        });
    }

    public signToken = (id: string) => {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: 86400 });
    }
}