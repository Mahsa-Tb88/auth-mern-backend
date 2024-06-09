import User from "../model/userSchema.js";

export async function initialize(req, res) {
  console.log("initialized");
  let user = {};
  console.log("req.email is: ", req.email);
  try {
    if (req.email) {
      user = await User.findOne({ email: req.email });
    }
    res.success("Initialized successfully", user);
  } catch (e) {
    res.fail(e.message, 500);
  }
}
