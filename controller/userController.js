import User from "../model/userSchema.js";
import bcryptjs from "bcryptjs";
export async function updateUser(res, req) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    return res.fail("Invalid Blog Id");
  }
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const username = req.body.username ?? user.username;
      const password = req.body.password ?? user.password;

      let hashPassword;
      if (req.body.password) {
        const newPassword = await bcryptjs.hash(password, 10);
        hashPassword = newPassword;
      }

      const findedUsername = await User.findOne({
        username: req.body.username,
      });
      if (findedUsername && findedUsername._id !== req.params.id) {
        res.fail("This username is already exists!");
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        username,
        password: hashPassword,
      });
      res.success("Updated Successfully");
    }
  } catch (e) {
    res.fail(e.message, 500);
  }
}
