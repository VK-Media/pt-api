import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserTypeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    access: {
        type: Map,
        of: String
    }
}, { timestamps: true });

export default UserTypeSchema;