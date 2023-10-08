import { JwtPayload } from 'jsonwebtoken';
import { IBook } from '../book/book.interface';
import { Book } from '../book/book.model';

// get single book service
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

// update cow service
const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  // eslint-disable-next-line no-unused-vars
  userData: JwtPayload | null
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload as string } },
    {
      new: true,
    }
  );

  // eslint-disable-next-line no-unused-vars
  // const result = await Book.updateOne({ id }, { $push: { reviews: payload } });
  return result;
};

export const CommentService = {
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
