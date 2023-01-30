import { model, Schema } from "mongoose";

// Create schema for Coffee Resource
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

// Export a Model based on the above schema
export default model('Coffee', schema);