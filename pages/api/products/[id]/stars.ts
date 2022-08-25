import { NextApiRequest, NextApiResponse } from "next";

import { getStars } from "../../../../controllers/product";
import connectToDb from "../../../../utils/coonectToDb";

export default async function getStarHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDb();
  if (req.method === "GET") getStars(req, res);
  else res.status(400).send({ error: "this is a bad request" });
}
