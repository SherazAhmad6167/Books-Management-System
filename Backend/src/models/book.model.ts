import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{timestamps: true})

export const Book = mongoose.model("Book", bookSchema)