import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { Request, Response } from 'express';

import { UserSchema } from '../models/index';

const User = mongoose.model('User', UserSchema);

export class UserController {
    public addNewUser = (req: Request, res: Response) => {
        let userData = req.body;

        if (req.body.password && req.body.email) {
            User.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) return res.status(500).send(err);
                if (existingUser) return res.status(409).send({ message: 'A user with this email already exists.' });

                bcrypt.hash(req.body.password, 10, (err, hash: String) => {
                    if (err) return res.status(500).send(err);

                    userData.password = hash;

                    let newUser = new User(userData);

                    newUser.save(async (err, createdUser) => {
                        if (err) return res.status(500).send(err);

                        const filteredUser = _.omit(createdUser.toObject(), 'password');
                        const token = await this.signToken(createdUser._id);

                        return res.send({ user: filteredUser, token });
                    });
                });
            });
        } else {
            return res.status(400).send({ message: 'Email and Password are required!' });
        }
    }

    public getUsers = (req: Request, res: Response) => {
        User.find({}, (err, users) => {
            if (err) return res.status(500).send(err);

            return res.send({ users });
        });
    }

    public getUserById = (req: Request, res: Response) => {
        User.findById(req.params.userId, (err, user) => {
            if (err) return res.status(500).send(err);

            return res.send({ user });
        });
    }

    public updateUser = (req: Request, res: Response) => {
        if (req.body.email) {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) return res.status(500).send(err);
                if (user) return res.status(409).send({ message: 'A user with this email already exists.' });

                User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, updatedUser) => {
                    if (err) return res.status(500).send(err);

                    return res.send({ user: updatedUser });
                });
            });
        } else {
            return res.status(400).send({ message: 'Email is required!' });
        }
    }

    public deleteUser = (req: Request, res: Response) => {
        User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'The user has been deleted!' });
        });
    }

    public authenticateUserWithCredentials = (req: Request, res: Response) => {
        User.findOne({ email: req.body.email }, async (err, user: any) => {
            if (err) return res.status(500).send(err);

            if (user) {
                if (await user.authenticate(req.body.password)) {
                    const token = this.signToken(user._id);

                    if (token) return res.send({ user, token });

                    return res.status(401).send({ message: "Token could not be generated." });
                }

                return res.status(401).send({ message: "User not authenticated" });
            }
        });
    }

    public authenticateUserWithJWT = (req: Request, res: Response) => {
        const authorizationHeader = req.headers['authorization']
        const bearer = authorizationHeader.split(' ');
        const token = bearer[1];

        if (typeof token !== 'string') return res.status(401).send({ message: 'No token provided!' });

        jwt.verify(token, process.env.JWT_SECRET || 'dev-secret', function (err, decoded: any) {
            if (err) return res.status(401).send({ message: 'Failed to authenticate token.' });

            User.findById(decoded.id, { password: 0 }, function (err, user) {
                if (err) return res.status(500).send({ message: 'There was a problem finding the user!' });
                if (!user) return res.status(404).send({ message: 'A user with given ID does not exist!' });

                return res.send({ user });
            });
        });
    }

    protected signToken = (id: string) => {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: 86400 });
    }
}