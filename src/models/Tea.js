import { model, Schema } from "mongoose";

// Create a schema for the Tea resource
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

// Export a model based on the above schema
export default model('Tea', schema);