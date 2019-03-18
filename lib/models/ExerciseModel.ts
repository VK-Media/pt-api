import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export default ExerciseSchema;