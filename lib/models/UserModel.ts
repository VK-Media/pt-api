import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    userType: {
        type: Schema.Types.ObjectId,
        ref: 'UserType'
    },
    age: {
        type: Number
    },
    avatar: {
        type: String
    },
    preferences: {
        type: Map,
        of: Schema.Types.Mixed
    }
}, { timestamps: true });

UserSchema.methods.authenticate = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export default UserSchema;