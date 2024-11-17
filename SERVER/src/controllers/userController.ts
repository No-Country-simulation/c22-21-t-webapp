import { catchError } from "@middlewares/catchError";
import { User } from "@models/User";

export const getAll = catchError(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});
