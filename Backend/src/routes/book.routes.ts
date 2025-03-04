import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { addBook,
    updateBook,
    viewAllBook,
    viewBook,
    deleteBook
        } from "../controllers/book.controller";

const router = Router()

router.route("/add").post(upload.single("image"), addBook)
router.route("/update/:id").patch(upload.single("image"), updateBook)
router.route("/").get(viewAllBook)
router.route("/view/:id").get(viewBook)
router.route("/delete/:id").delete(deleteBook)

export default router