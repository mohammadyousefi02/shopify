import { NextApiRequest, NextApiResponse } from "next";

import { addComment, getComments } from "../../../../controllers/product";
import connectToDb from "../../../../utils/coonectToDb";

export default async function getProductById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDb();
  if (req.method === "POST") addComment(req, res);
  else if (req.method === "GET") getComments(req, res);
  else res.status(400).send({ error: "this is a bad request" });
}
