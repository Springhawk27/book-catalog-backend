"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const book_model_1 = require("../book/book.model");
// get single book service
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
// update cow service
const updateBook = (id, payload, 
// eslint-disable-next-line no-unused-vars
userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: payload } }, {
        new: true,
    });
    // eslint-disable-next-line no-unused-vars
    // const result = await Book.updateOne({ id }, { $push: { reviews: payload } });
    return result;
});
exports.CommentService = {
    getSingleBook,
    updateBook,
};
// app.post("/comment/:id", async (req, res) => {
//   const productId = req.params.id;
//   const comment = req.body.comment;
//   console.log(productId);
//   console.log(comment);
//   const result = await productCollection.updateOne(
//     { _id: ObjectId(productId) },
//     { $push: { comments: comment } }
//   );
//   console.log(result);
//   if (result.modifiedCount !== 1) {
//     console.error("Product not found or comment not added!");
//     res.json({ error: "Product not found or comment not added" });
//     return;
//   }
//   console.log("Comment added successfully");
//   res.json({ message: "Comment added successfully" });
// });
