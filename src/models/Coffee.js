import { model, Schema } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        immutable: true,
    },
    ingredients: {
        type: [],
        required: true,
    }
});

export default model('Coffee', schema);