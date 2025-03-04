import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Book } from "../models/book.model";
import mongoose from "mongoose";
//import { uploadOnCloudinary } from "../utils/cloudinary";

const addBook = asyncHandler ( async (req , res) => {
        const {title, description, author, category, year} = req.body
        let myImage: any
        myImage = req.file?.path
        if(!myImage){
            throw new ApiError(400, "Please upload image")
        }
     if([title, description, author, category, year].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
     }
    //  console.log("uploading to cloudinary", myImage)
    //  const coverImage = await uploadOnCloudinary(myImage)
    //  if(!coverImage){
    //     throw new ApiError(400, "Image is not uploaded in cloudinary")
    //  }
    //  console.log("cloudinary response", coverImage);
     const book = await Book.create({
        title,
        description,
        author,
        category,
        year,
        image : myImage
     })

      res.status(200).json(new ApiResponse(200, book , "Book successfully added"))
})



const viewAllBook = asyncHandler(async (req , res) => {
    const books = await Book.find();
    if(!books){
        throw new ApiError(400, "Books not Found")
    }
     res
    .status(200)
    .json(new ApiResponse(200, books, "Books Found Successfully"))
})




const viewBook = asyncHandler(async (req , res) => {
    const {id} = req.params

    const book = await Book.findById(id)

    if(!book){
        throw new ApiError(400, "Book Not Found")
    }
     res
    .status(200)
    .json(new ApiResponse(200 , book , "Book fetch successfully"))
})





const updateBook = asyncHandler(async (req, res) => {
    const {title, author, description, category, year} = req.body
    if(!title || !author || !description || !category || !year ){
        throw new ApiError(400, "All fields are required")
    }
    const updateFields: any = {}
    if (title) updateFields.title = title;
    if (author) updateFields.author = author;
    if (description) updateFields.description = description;
    if (category) updateFields.category = category;
    if (year) updateFields.year = year;

    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    // if (req.file?.path) {
    //     const coverImage = await uploadOnCloudinary(req.file.path);
    //     if (!coverImage?.url) {
    //         throw new ApiError(400, "Failed to upload image");
    //     }
    //     imageUrl = coverImage.url;
    // }
    let imageUrl = book.image
    if (req.file?.path) {
        imageUrl = req.file?.path; 
    }
        updateFields.image = imageUrl; 
    
    const updatedBook = await Book.findByIdAndUpdate(req.params.id,{
           $set: updateFields        
    },{new: true})
    res
    .status(200)
    .json(new ApiResponse (200, updatedBook, "Book Updated Successfully"))
})




const deleteBook = asyncHandler(async (req , res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if(!book){
        throw new ApiError(404, "Book Not Found")
    }

    res
    .status(200)
    .json(new ApiResponse(200, book , "Book deleted successfully"))
})

export{
    addBook,
    viewBook,
    viewAllBook,
    deleteBook,
    updateBook
}


